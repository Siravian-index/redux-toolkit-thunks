import * as React from 'react'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../app/store'
import { getAllPosts, selectPostsFetchError, selectPostsState, selectPostsStatus } from '../features/postSlice'
import { fetchStatus, postType } from '../types/postTypes'
import Post from './Post'

interface IPostListProps {}

const PostList: React.FunctionComponent<IPostListProps> = ({}) => {
  const dispatch = useAppDispatch()

  const error = useSelector(selectPostsFetchError())
  const status = useSelector(selectPostsStatus())
  const postsState = useSelector(selectPostsState())

  React.useEffect(() => {
    if (status === fetchStatus.IDLE) {
      dispatch(getAllPosts())
    }
  }, [dispatch])

  console.log(status)

  return <div className='container'>{!error && postsState.map((post) => <Post key={post.id} post={post} />)}</div>
}

export default PostList
