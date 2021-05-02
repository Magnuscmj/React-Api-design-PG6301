//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React, { useState } from "react";
import { postJson } from "../lib/http";
import { useHistory } from "react-router";
import { useSubmit } from "../components/UseSubmit";
import { InputField } from "../components/InputField";
import GoogleButton from "react-google-button";
import {Redirect} from "react-router-dom";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
  const history = useHistory();

  const { handleSubmit: handleLogin, submitting, error } = useSubmit(
    async () => {
      await postJson("/api/loginHard",  { username, password });

        setRedirect(true);
        },
    () => history.push("/messages")
  );
    if (redirect) {
        return <Redirect to='/messages' />;
    }


  return (
    <div className="login-container">
      <h2 className="h2-sign-in">Please sign in</h2>
      <form className="form-login" onSubmit={handleLogin}>
        {submitting && <div>Please wait</div>}
        {error && <div>Error {error.toString()}</div>}

        <InputField
          className="username"
          id="floatingInput"
          type="username"
          autoFocus={true}
          value={username}
          onChangeValue={setUsername}
        />

        <div className="password">
          <InputField
            className="form-control"
            type="password"
            value={password}
            onChangeValue={setPassword}
          />
        </div>

        <button className="loginBtn" disabled={submitting}>
          Sign in
        </button>
      </form>

      <a href={"api/login"} target={"_self"}>
        <GoogleButton className="google-button" />
      </a>
    </div>
  );
}
