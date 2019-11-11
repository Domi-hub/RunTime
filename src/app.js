import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Profile from "./profile";
import TimeToRun from "./time-to-run"
import { Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";


export default function App() {
    const isLoggedIn = !["/register", "/login"].includes(location.pathname);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <React.Fragment>
                    <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="/">TimeToRun</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/events">My Events</Nav.Link>
                        <Nav.Link href="/profile">Edit Profile</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button variant="outline-light" href="/logout">Logout</Button>
                    </Form>
                    </Navbar>
                </React.Fragment>
            )}
            <div>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route exact path="/" component={TimeToRun}/>
            </div>
        </BrowserRouter>
    );
};