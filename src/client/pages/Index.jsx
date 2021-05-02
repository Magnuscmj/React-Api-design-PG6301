//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Link } from "react-router-dom";
import { Route, Switch } from "react-router";

import { Profile } from "./Profile";
import { Login } from "./Login";
import { Navbar } from "../components/Navbar";
import {Message} from "./Message";
import {CreateNewConv} from "./CreateNewConv";
import {EditMessage} from "./EditMessage";

function Application() {
    const messageApi = {
        listMessages: async () => {
            const res = await fetch("/api/messages");
            if (!res.ok) {
                throw new Error(
                    `Something went wrong loading ${res.url}: ${res.statusText}`
                );
            }
            return await res.json();
        },
        getMessage: async (id) => {
            const res = await fetch(`/api/messages/${id}`);
            if (!res.ok) {
                throw new Error(
                    `Something went wrong loading ${res.url}: ${res.statusText}`
                );
            }
            return await res.json();
        },
    };
  return (
    <BrowserRouter>
      <header>
        <Navbar />
      </header>
    <main>
      <Switch>
          <main className="form-signin">
          <Route exact path={"/messages"}>
              <Message messageApi={messageApi} />
          </Route>
          <Route path={"/new"}>
              <CreateNewConv />
          </Route>
          <Route path={"/messages/:id/edit"}>
              <EditMessage messageApi={messageApi} />
          </Route>
          <Route exact path={"/"}>
          </Route>

          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Login} />
        </main>
        <Route>
          <h1>Not found</h1>
        </Route>
      </Switch>
    </main>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
