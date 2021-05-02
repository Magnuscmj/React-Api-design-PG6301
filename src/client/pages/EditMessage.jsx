//This file has code from the lecturer and has been changed to fit this assignment
//https://github.com/kristiania-pg6301-2021/pg6301-react-and-express-lectures

import React, { useState } from "react";
import { useParams } from "react-router";
import { LoadingView } from "../components/LoadingView";
import { InputField } from "../components/InputField";
import { useLoading } from "../lib/useLoading";
import { ErrorView } from "../components/ErrorView";
import {Link} from "react-router-dom";
import { Redirect } from 'react-router-dom';

function EditMessageForm({ message }) {
    const [to, setTo] = useState(message.to);
    const [text, setText] = useState(message.text);
    const [time, setTime] = useState(message.time);
    const [redirect, setRedirect] = useState(false);

    async function submit(e) {
        e.preventDefault();
        console.log("Submitting", { to, text, time });
        await fetch(`/api/messages/${message.id}`, {
            method: "PUT",
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
            <h1>Go to conversation ({to})</h1>
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

export function EditMessage({ messageApi }) {
    const { id } = useParams();

    const { data: message, loading, error, reload } = useLoading(
        async () => await messageApi.getMessage(id),
        [id]
    );

    if (error) {
        return <ErrorView error={error} reload={reload()} />;
    }

    if (loading || !message) {
        return <LoadingView />;
    }

    return <EditMessageForm message={message} />;
}



