//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures


import * as ReactDOM from "react-dom";
import * as React from "react";
import { MemoryRouter } from "react-router";
import { act } from "react-dom/test-utils";
import {EditMessage} from "../src/client/pages/EditMessage";


async function renderForTest(child) {
    const container = document.createElement("div");
    await act(async () => {
        await ReactDOM.render(<MemoryRouter>{child}</MemoryRouter>, container);
    });
    return container;
}

describe("edit message page", () => {
    it("can show information about messages", async () => {
        const getMessage = () => ({
            text: "yanii",
            to: "halla",
            time: "1925",
        });
        const container = await renderForTest(
            <EditMessage messageApi={{ getMessage }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("h1").textContent).toEqual(
            "Go to conversation (halla)"
        );
    });

    it("can show loading screen", async () => {
        const getMessage = () => new Promise((resolve) => {});
        const container = await renderForTest(
            <EditMessage messageApi={{ getMessage }} />
        );
        expect(container.innerHTML).toMatchSnapshot();
        expect(container.querySelector("div").textContent).toEqual("Loading...");
    });

        it("Should render the navigation bar",() => {
            const container = document.createElement("div");
            ReactDOM.render(
                <MemoryRouter>
                    <EditMessage />
                </MemoryRouter>,
                container
            );
            expect(container.innerHTML).toMatchSnapshot();
        })

});