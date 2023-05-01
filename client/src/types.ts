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
  table: number,
  result?: result
}

export enum result {
  IN_PROGRESS = "IN_PROGESS",
  WHITE_VICTORY = "WHITE_VICTORY",
  BLACK_VICTORY = "BLACK_VICTORY",
  DRAW = "DRAW"
}

export type Round = {
  order: number,
  matches: Match[]
}

export type Settings = {
  tableCount: number
}

export type ProtectedRouteProps = {
  path: string,
  component: any
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
  roundNr: number | string,
  isAdmin?: boolean,
  getUsers?: any
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
