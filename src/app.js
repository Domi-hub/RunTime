import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Profile from "./profile";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
            </div>
        </BrowserRouter>
    );
};