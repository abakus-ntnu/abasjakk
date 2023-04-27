import { UseQueryResult } from "react-query"

export type User = {
  _id?: string,
  name: string,
  score?: number
}

export type Match = {
  _id?: string,
  white: string,
  black: string,
  table: number
}

export type Round = {
  order: number,
  matches: string[]
}

export interface LeaderboardProps {
  data: User[],
  initialData: User[],
  getUsersQuery: UseQueryResult<User[], unknown>
}

export interface QueryProps {
  status?: string,
  isLoading?: boolean,
  isError?: boolean,
  error?: Error | unknown
}


export interface QueryPropsUsers extends QueryProps {
  data: User[],
  refetch?: any
}
