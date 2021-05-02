//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import { ErrorView } from "../components/ErrorView";
import { LoadingView } from "../components/LoadingView";
import { useLoading } from "../lib/useLoading";
import { fetchJson } from "../lib/http";
import {Link} from "react-router-dom";

export function Profile() {
  const { loading, error, data } = useLoading(() => fetchJson("/api/profile"));


    function handleSubmitChatMessage(e) {
        e.preventDefault();

    }
  if (error) {
    return <ErrorView error={error} />;
  }
  if (loading || !data) {
    return <LoadingView />;
  }

  const { username} = data;



  return (
    <div>
      <h2>Your profile:</h2>
      <div>Username: {username}</div>
       <div className="messageList">
        <h1>Chat page</h1>
        <ul>
          <li>
            <Link to={"/messages"}>See messages</Link>
          </li>
          <li>
            <Link to={"/new"}>Start new chat</Link>
          </li>
        </ul>
       </div>
    </div>
  );
}
