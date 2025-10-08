import { configureStore } from '@reduxjs/toolkit'
import postReducer from './api/postSlice'
import accountReducer from './api/accountSlice'
import likedPostsReducer from './api/likedPostsSlice'
// ...

export const store = configureStore({
  reducer: {
    posts: postReducer,
    account: accountReducer,
    likePosts: likedPostsReducer,
  },
  
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store