import { StateUpdater } from "preact/hooks"
import { UseQueryResult } from "react-query"

export type User = {
  _id?: string,
  name: string,
  score?: number
}

export type Match = {
  _id?: string,
  white: User,
  black: User,
  table: number
}

export type Round = {
  order: number,
  matches: Match[]
}

export type StatusMessageProps = {
  query?: UseQueryResult<User[], unknown> | UseQueryResult<Round[], unknown>,
  status?: string
}

export interface SearchBarProps {
  type: "USER" | "ROUND" | "BOTH",
  users?: User[],
  rounds?: Round[],
  setUsers?: StateUpdater<User[]>,
  setRounds?: StateUpdater<Round[]>
}


export interface LeaderboardProps {
  data: User[],
  initialData: User[],
  getUsersQuery: UseQueryResult<User[], unknown>
}

export interface MatchesTableProps {
  data: Round,
  isAdmin?: boolean,
  roundNr: number | string
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
