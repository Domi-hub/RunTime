import React, { Fragment } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Register from "./register";
import Login from "./login";
import Events from "./events";
import Profile from "./profile";
import GoogleMap from "./google-map"
import { Navbar, Nav, Form, FormControl, Button} from "react-bootstrap";


export default function App() {
    const isLoggedIn = !["/register", "/login"].includes(location.pathname);

    return (
        <BrowserRouter>
            {isLoggedIn && (
                <Fragment>
                    <Navbar bg="warning" variant="dark">
                    <Navbar.Brand href="/">TimeToRun</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/events">My Events</Nav.Link>
                        <Nav.Link href="/profile">Edit Profile</Nav.Link>
                    </Nav>
                    <Form inline>
                    <Button variant="outline-light" href="/logout">Logout</Button>
                    </Form>
                    </Navbar>
                </Fragment>
            )}

            <div>
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/events" component={Events} />
                <Route path="/profile" component={Profile} />
                <Route exact path="/" component={GoogleMap}/>
            </div>
        </BrowserRouter>
    );
};