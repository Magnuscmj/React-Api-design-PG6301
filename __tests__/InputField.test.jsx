//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import {InputField} from "../src/client/components/InputField";
import React from "react";
import * as ReactDOM from "react-dom";
import {MemoryRouter} from "react-router";


function input() {
    return null;
}

describe("InputField", () => {
    it("Should render the navigation bar",() => {
        const container = document.createElement("div");
        ReactDOM.render(
            <MemoryRouter>
                <InputField />
            </MemoryRouter>,
            container
        );
        expect(container.innerHTML).toMatchSnapshot();
    })
})



