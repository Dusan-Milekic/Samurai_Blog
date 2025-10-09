import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

/* ---------- Tipovi ---------- */
export interface IPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  created_at: string;
  published: boolean;
  count_likes: number;
  author?: number; // 🔥 DODAO author field
}

/* ---------- Thunk: Fetch posts ---------- */
export const fetchPosts = createAsyncThunk<IPost[]>(
  "posts/fetchPosts",
  async () => {
    const res = await fetch("http://127.0.0.1:8000/posts/");
    if (!res.ok) throw new Error(`Failed to fetch posts: ${res.status}`);
    return (await res.json()) as IPost[];
  }
);

/* ---------- Thunk: Like post ---------- */
export const likePost = createAsyncThunk<
    { postId: number; count_likes?: number; detail?: string },
    { userId: number; postId: number },
    { rejectValue: string }
>(
    'posts/likePost',
    async ({ userId, postId }, { rejectWithValue }) => {
        try {
            const res = await fetch("http://127.0.0.1:8000/likes/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user: userId, post: postId }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                return rejectWithValue(errorData.detail || 'Failed to like post');
            }

            const data = await res.json();
            return { postId, count_likes: data.count_likes };
        } finally{
          console.log("completed");
        }
    }
);

/* ---------- State ---------- */
interface PostsState {
  items: IPost[];
  loading: boolean;
  error: string | null;
  liking: Record<number, boolean>;
}

const initialState: PostsState = {
  items: [],
  loading: false,
  error: null,
  liking: {},
};

/* ---------- Slice ---------- */
export const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /* --- FETCH POSTS --- */
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<IPost[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch posts";
      })

      /* --- LIKE POST --- */
      .addCase(likePost.pending, (state, action) => {
        const { postId } = action.meta.arg; // 🔥 ISPRAVKA - destructure postId
        state.liking[postId] = true;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, count_likes, detail } = action.payload;
        const post = state.items.find((p) => p.id === postId);
        if (post) {
          if (typeof count_likes === "number") {
            post.count_likes = count_likes;
          } else if (detail === "liked") {
            post.count_likes += 1;
          }
        }
        state.liking[postId] = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        const { postId } = action.meta.arg; // 🔥 ISPRAVKA - destructure postId
        state.liking[postId] = false;
        state.error = (action.payload as string) || "Failed to like post";
      });
  },
});

/* ---------- Selectori ---------- */
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectLikingMap = (state: RootState) => state.posts.liking;

// 🔥 DODAO HELPER SELECTORS
export const selectPostBySlug = (state: RootState, slug: string) => 
  state.posts.items.find(post => post.slug === slug);

export const selectIsLiking = (state: RootState, postId: number) => 
  state.posts.liking[postId] || false;

/* ---------- Export ---------- */
export default postSlice.reducer;