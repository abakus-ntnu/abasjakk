import { UseQueryResult } from "react-query";
import { User } from "src/types";

type Props = {
    query: UseQueryResult<User[], unknown>
    // status: string,
    // error: Error | unknown
}

const StatusMessage = ({ query }:Props) => {
    if (query.status === "loading") return (
        <p className="loading">Loading...</p>
    );
    if (query.status === "error" && query.error instanceof Error) return (
        <p className="error"><b>{query.error.message}</b><br />An error has occured :/</p>
    );
    return (
        <p>If you read this, idk what happened...</p>
    );
}

export default StatusMessage;