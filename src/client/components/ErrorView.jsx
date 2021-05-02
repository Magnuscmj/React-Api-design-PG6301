//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import GoogleButton from "react-google-button";
import {Link} from "react-router-dom";

export function ErrorView({ error }) {
  if (error.status === 401) {
    return (
      <div>
        <h2 className="title">You are not signed in:</h2>
        <Link to="/login">Click here to go to Login</Link>
      </div>
    );
  }
  return <div>An error occurred: {error.toString()}</div>;
}
