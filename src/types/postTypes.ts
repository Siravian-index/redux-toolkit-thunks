export type postType = {
  id: number | string
  userId: number | string
  title: string
  body: string
}

export enum fetchStatus {
  IDLE = 'idle',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface IState {
  posts: postType[]
  status: fetchStatus
  error: string | null
}
