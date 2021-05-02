//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import * as ReactDOM from "react-dom";
import {MemoryRouter} from "react-router";
import {ErrorView} from "../src/client/components/ErrorView";

describe("ErrorView", () => {
    it("should handle error messages",() => {
        const container = document.createElement("div");
        let ok;
        ReactDOM.render(
            <MemoryRouter>
                <ErrorView error={status === ok} />,
            </MemoryRouter>,
            container
        );
        expect(container.innerHTML).toMatchSnapshot();
    })
})