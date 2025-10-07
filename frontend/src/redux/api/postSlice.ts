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

/* ---------- Thunk: Like post (čeka server) ---------- */
/* Backend (preporuka): vrati JSON { detail: "liked" | "already liked", count_likes: number } */
export const likePost = createAsyncThunk<
  { postId: number; count_likes?: number; detail?: string }, // payload
  number,                                                    // arg: postId
  { rejectValue: string }
>(
  "posts/likePost",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/likes/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: 4, post: postId }), // TODO: zameni pravim user ID-jem / JWT
      });

      // DRF kod nas vraća 201 ("liked") ili 200 ("already liked")
      const data = await res.json().catch(() => ({} as any));

      if (!res.ok && res.status !== 200) {
        return rejectWithValue(data?.detail || `HTTP ${res.status}`);
      }

      return { postId, count_likes: data?.count_likes, detail: data?.detail };
    } catch (err: any) {
      return rejectWithValue(err?.message || "Network error");
    }
  }
);

/* ---------- State ---------- */
interface PostsState {
  items: IPost[];
  loading: boolean;
  error: string | null;
  liking: Record<number, boolean>; // per-post stanje za dugme
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

      /* --- LIKE POST: bez optimističkog povećanja --- */
      .addCase(likePost.pending, (state, action) => {
        const id = action.meta.arg;
        state.liking[id] = true; // disable dugme za taj post
      })
      .addCase(likePost.fulfilled, (state, action) => {
        const { postId, count_likes, detail } = action.payload;
        const post = state.items.find((p) => p.id === postId);
        if (post) {
          if (typeof count_likes === "number") {
            // Ako backend vrati count_likes (preporučeno)
            post.count_likes = count_likes;
          } else if (detail === "liked") {
            // fallback ako backend ne vrati broj – ipak uvećaj
            post.count_likes += 1;
          }
          // ako je "already liked" i nema count_likes, ostavi kako jeste
        }
        state.liking[postId] = false;
      })
      .addCase(likePost.rejected, (state, action) => {
        const id = (action.meta as any).arg as number;
        state.liking[id] = false;
        state.error = (action.payload as string) || "Failed to like post";
      });
  },
});

/* ---------- Selectori ---------- */
export const selectPosts = (state: RootState) => state.posts.items;
export const selectPostsLoading = (state: RootState) => state.posts.loading;
export const selectPostsError = (state: RootState) => state.posts.error;
export const selectLikingMap = (state: RootState) => state.posts.liking;

/* ---------- Export ---------- */
export default postSlice.reducer;
