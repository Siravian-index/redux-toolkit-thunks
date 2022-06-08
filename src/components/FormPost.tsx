import { nanoid } from '@reduxjs/toolkit'
import * as React from 'react'
import { useAppDispatch } from '../app/store'
import { createPost } from '../features/postSlice'
import { postType } from '../types/postTypes'

interface IFormPostProps {}

const FormPost: React.FunctionComponent<IFormPostProps> = (props) => {
  const [title, setTitle] = React.useState('')
  const [body, setBody] = React.useState('')
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (title && body) {
      // dispatch
      const newPost: postType = { title, body, id: nanoid(), userId: nanoid() }
      dispatch(createPost(newPost))
      setTitle('')
      setBody('')
    }
  }
  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          title:
          <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          body:
          <input type='text' value={body} onChange={(e) => setBody(e.target.value)} />
        </label>
        <button type='submit'>submit</button>
      </form>
    </>
  )
}

export default FormPost
