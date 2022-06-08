import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import { useAppDispatch } from './app/store'
import FetchError from './components/FetchError'
import FormPost from './components/FormPost'
import Post from './components/Post'
import PostList from './components/PostList'
import { getAllPosts, selectPostsFetchError, selectPostsState, selectPostsStatus } from './features/postSlice'
import { fetchStatus } from './types/postTypes'

function App() {
  const error = useSelector(selectPostsFetchError())

  return (
    <div className='App'>
      <FormPost />
      <header className='App-header'>{error ? <FetchError /> : <PostList />}</header>
    </div>
  )
}

export default App
