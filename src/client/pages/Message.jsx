//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import { LoadingView } from "../components/LoadingView";
import { Link } from "react-router-dom";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";


export function Message({ messageApi }) {
    const { data: messages, error, loading, reload } = useLoading(
        async () => await messageApi.listMessages()
    );

    if (error) {
        return <ErrorView error={error} reload={reload} />;
    }

    if (loading || !messages) {
        return <LoadingView />;
    }

    return (
        <div className="messagePage">
            <Link className="backBtn" to={"/profile"}>Back</Link>
            <h1>Chat</h1>
            {messages.map(({ id, to, text, time }) => (
                <li key={id}>
                    <Link to={`/messages/${id}/edit`}>({time})  {to}: {text}</Link>
                </li>
            ))}
        </div>
    );
}
