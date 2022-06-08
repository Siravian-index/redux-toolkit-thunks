import * as React from 'react'
import { useAppDispatch } from '../app/store'
import { deletePost } from '../features/postSlice'
import { postType } from '../types/postTypes'

interface IPostProps {
  post: postType
}

const Post: React.FunctionComponent<IPostProps> = ({ post }) => {
  const dispatch = useAppDispatch()
  const handleDeletion = (post: postType) => {
    dispatch(deletePost(post))
  }

  return (
    <div className='item' onClick={() => handleDeletion(post)}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  )
}

export default Post
