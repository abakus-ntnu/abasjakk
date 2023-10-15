import { StatusMessageProps } from "@/types";

const StatusMessage = ({ query, status }:StatusMessageProps) => {
    if (query) {
        if (query.status === "loading") return (
            <p className="loading">Loading...</p>
        );
        if (query.status === "error" && query.error instanceof Error) return (
            <p className="error"><b>{query.error.message}</b><br />An error has occured :/</p>
        );
        if (query.status === "success") return (
            <p className="success">Oi her var det tomt!</p>
        )
    }
    if (status === "no-results") return (
        <p className="info">Ingen Treff...</p>
    )
    return (
        <p>If you read this, idk what happened...</p>
    )
}

export default StatusMessage;