//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React, { useState } from "react";
import { InputField } from "../components/InputField";
import {Link, Redirect} from "react-router-dom";

export function CreateNewConv() {
    const [to, setTo] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", { to, text, time });
        await fetch("/api/messages", {
            method: "POST",
            body: JSON.stringify({ to, text, time }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        setRedirect(true);
    }
    if (redirect) {
        return <Redirect to='/messages' />;
    }

    return (

        <form onSubmit={submit}>
            <Link className="backBtn" to={"/Profile"}>Back</Link>
            <h1>Start new chat</h1>
            <InputField label={"To"} value={to} onChangeValue={setTo} />
            <InputField label={"Text"} value={text} onChangeValue={setText} />
            <InputField
                label={"Time"}
                value={time}
                onChangeValue={setTime}
                type="number"
            />
            <button>Submit</button>
        </form>
    );
}
