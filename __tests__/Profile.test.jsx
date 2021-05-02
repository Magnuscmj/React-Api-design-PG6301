//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import * as ReactDOM from "react-dom";
import {MemoryRouter} from "react-router";
import {Profile} from "../src/client/pages/Profile";

describe("Profile", () => {
    it("to see the profile", () => {
        const container = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <Profile />,
            </MemoryRouter>,
            container
        );
        expect(container.innerHTML).toMatchSnapshot();
    })
})