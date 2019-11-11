import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./actions";

export default function Login() {
    const dispatch = useDispatch();
    const isError = useSelector(state => state.isError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <React.Fragment>
            {isError && (
                <React.Fragment>Something went wrong.</React.Fragment>
            )}
            <input
                name="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <button className="login-button" onClick={() => dispatch(login(email, password))}>
                Login
            </button>
            <Link to="/register">Click here to Register!</Link>
        </React.Fragment>
    );
}