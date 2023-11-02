import { UseQueryResult } from "@tanstack/react-query";
import { Round, User } from "@/types";

type Props = {
  query?: UseQueryResult<User[], unknown> | UseQueryResult<Round[], unknown>;
  status?: string;
};

const StatusMessage = ({ query, status }: Props) => {
  if (query) {
    if (query.status === "pending")
      return <p className="loading">Loading...</p>;
    if (query.status === "error" && query.error instanceof Error)
      return (
        <p className="error">
          <b>{query.error.message}</b>
          <br />
          An error has occured :/
        </p>
      );
    if (query.status === "success")
      return <p className="success">Oi her var det tomt!</p>;
  }
  if (status === "no-results") return <p className="info">Ingen Treff...</p>;
  return <p>If you read this, idk what happened...</p>;
};

export default StatusMessage;
