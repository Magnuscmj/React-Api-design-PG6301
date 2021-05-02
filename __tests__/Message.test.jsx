//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router";
import {Message} from "../src/client/pages/Message";



const messageApi = {
    listMessages: async () => [{ id: 1, to: "hei, hva skjer?" }],
};

describe("message list", () => {
    it("show messages", async () => {
        const container = document.createElement("div");
        document.body.appendChild(container);
        await act(async () => {

            ReactDOM.render(
                <MemoryRouter>
                    <Message messageApi={messageApi} />
                </MemoryRouter>,
                container
            );
        });

        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("li").textContent).toEqual(
            "()  hei, hva skjer?: "
        );
    });
});
