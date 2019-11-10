import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./actions";

export default function Register() {
    const dispatch = useDispatch();
    const isError = useSelector(state => state.isError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <div className="registration">
            {isError && (
                <div className="error">Something went wrong.</div>
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
            <input
                name="firstName"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)}
            />
            <input
                name="lastName"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
            />
            <button
                className="register-button"
                onClick={() => dispatch(register(email, password, firstName, lastName))}
            >
                REGISTER
            </button>
            <Link to="/login">Click here to Log in!</Link>
        </div>
    );
}