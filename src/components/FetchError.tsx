import * as React from 'react'
import { useSelector } from 'react-redux'
import { selectPostsFetchError } from '../features/postSlice'

interface IFetchErrorProps {}

const FetchError: React.FunctionComponent<IFetchErrorProps> = (props) => {
  const error = useSelector(selectPostsFetchError())
  return <div>{error}</div>
}

export default FetchError
