import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
const API_BASE_URL = import.meta.env.VITE_API_URL
/* ---------- Tipovi ---------- */
export interface ILike {
  id: number;
  user: number;
  post: number;
}

export interface ILikedPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  published: boolean;
  count_likes: number;
}

/* ---------- Thunk: Fetch likes ---------- */
export const fetchLikes = createAsyncThunk<ILike[]>(
  "likedPosts/fetchLikes",
  async () => {
    const res = await fetch(`${API_BASE_URL}/likes/`);
    if (!res.ok) throw new Error(`Failed to fetch likes: ${res.status}`);
    return (await res.json()) as ILike[];
  }
);

/* ---------- Thunk: Like/Unlike post ---------- */
export const toggleLikePost = createAsyncThunk<
  { detail: string; count_likes: number; post_id: number; user_id: number },
  { userId: number; postId: number }
>(
  "likedPosts/toggleLikePost",
  async ({ userId, postId }) => {
    const res = await fetch(`${API_BASE_URL}/likes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: userId, post: postId }),
    });
    
    if (!res.ok) throw new Error(`Failed to like post: ${res.status}`);
    const data = await res.json();
    
    return {
      ...data,
      post_id: postId,
      user_id: userId
    };
  }
);

/* ---------- State ---------- */
interface LikedPostsState {
  likes: ILike[];
  loading: boolean;
  error: string | null;
  liking: Record<number, boolean>; // per-post stanje za dugme
}

const initialState: LikedPostsState = {
  likes: [],
  loading: false,
  error: null,
  liking: {},
};

/* ---------- Slice ---------- */
export const likedPostsSlice = createSlice({
  name: "likedPosts",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setLiking: (state, action: PayloadAction<{ postId: number; isLiking: boolean }>) => {
      state.liking[action.payload.postId] = action.payload.isLiking;
    }
  },
  extraReducers: (builder) => {
    builder
      /* --- FETCH LIKES --- */
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikes.fulfilled, (state, action: PayloadAction<ILike[]>) => {
        state.loading = false;
        state.likes = action.payload;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch likes";
      })

      /* --- TOGGLE LIKE POST --- */
      .addCase(toggleLikePost.pending, (state, action) => {
        const postId = action.meta.arg.postId;
        state.liking[postId] = true;
      })
      .addCase(toggleLikePost.fulfilled, (state, action) => {
        const { post_id, user_id, detail } = action.payload;
        state.liking[post_id] = false;
        
        if (detail === "liked") {
          // Dodaj novi like u state
          const newLike: ILike = {
            id: Date.now(), // temporary ID
            user: user_id,
            post: post_id
          };
          state.likes.push(newLike);
        }
        // Note: "already liked" slučaj - ne menjamo state
      })
      .addCase(toggleLikePost.rejected, (state, action) => {
        const postId = action.meta.arg.postId;
        state.liking[postId] = false;
        state.error = action.error.message || "Failed to like post";
      });
  },
});

/* ---------- Actions ---------- */
export const { clearError, setLiking } = likedPostsSlice.actions;

/* ---------- Selectori ---------- */
export const selectLikes = (state: RootState) => state.likePosts.likes;
export const selectLikesLoading = (state: RootState) => state.likePosts.loading;
export const selectLikesError = (state: RootState) => state.likePosts.error;
export const selectLikingMap = (state: RootState) => state.likePosts.liking;

// Helper selektor: da li je korisnik lajkovao post
export const selectIsPostLiked = (state: RootState, userId: number, postId: number) => {
  return state.likePosts.likes.some(like => like.user === userId && like.post === postId);
};

// Helper selektor: liked posts za korisnika
export const selectUserLikedPosts = (state: RootState, userId: number) => {
  return state.likePosts.likes.filter(like => like.user === userId);
};

/* ---------- Export ---------- */
export default likedPostsSlice.reducer;