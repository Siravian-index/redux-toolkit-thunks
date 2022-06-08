import { postType } from './../types/postTypes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'
import { fetchStatus, IState } from '../types/postTypes'

const initialState: IState = {
  posts: [],
  status: fetchStatus.IDLE,
  error: null,
}

// valid endpoint
const ENDPOINT = 'https://jsonplaceholder.typicode.com/posts'
// uncomment to se the error fallback
// const ENDPOINT = 'https://jsoholder.typicode.com/posts'

// thunk actions
// get all
export const getAllPosts = createAsyncThunk('posts/fetchAll', async () => {
  const response = await fetch(ENDPOINT)
  return (await response.json()) as postType[]
})

// post one
export const createPost = createAsyncThunk('posts/create', async (post: postType) => {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(post),
  })
  return (await response.json()) as postType
})

export const deletePost = createAsyncThunk('posts/delete', async (post: postType) => {
  const response = await fetch(`${ENDPOINT}/${post.id}`, {
    method: 'DELETE',
  })
  return { deleted: response.ok, postId: post.id }
})

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    addPost: (state, action) => {},
    removePost: (state, action) => {},
    updatePost: (state, action) => {},
  },
  extraReducers: (builder) => {
    // get
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.status = fetchStatus.PENDING
    })
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.status = fetchStatus.COMPLETED
      state.posts = action.payload
    })
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.status = fetchStatus.FAILED
      state.error = 'Something went wrong while fetching'
      state.posts = []
    })
    // post
    builder.addCase(createPost.pending, (state) => {
      state.status = fetchStatus.PENDING
    })
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.status = fetchStatus.COMPLETED
      state.posts.push(action.payload)
    })
    builder.addCase(createPost.rejected, (state) => {
      state.status = fetchStatus.FAILED
      state.error = 'Something went wrong while creating the post'
    })
    // delete
    builder.addCase(deletePost.pending, (state) => {
      state.status = fetchStatus.PENDING
    })
    builder.addCase(deletePost.fulfilled, (state, action) => {
      state.status = fetchStatus.COMPLETED
      if (action.payload.deleted) {
        state.posts = state.posts.filter((post) => post.id !== action.payload.postId)
      }
    })
    builder.addCase(deletePost.rejected, (state) => {
      state.status = fetchStatus.FAILED
      state.error = 'Something went wrong while deleting the post'
    })
    // PUT is very similar to POST
  },
})

// actions
export const { addPost, removePost, updatePost } = postSlice.actions

// state selectors
export const selectPostsState = () => (state: RootState) => state.posts.posts
export const selectPostsStatus = () => (state: RootState) => state.posts.status
export const selectPostsFetchError = () => (state: RootState) => state.posts.error
