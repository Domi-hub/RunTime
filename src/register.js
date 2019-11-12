import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./actions";
import { Form, Button, Row} from "react-bootstrap";

export default function Register() {
    const dispatch = useDispatch();
    const isError = useSelector(state => state.isError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <React.Fragment>
            {isError && (
                <React.Fragment>Something went wrong.</React.Fragment>
            )}

            <div class="card">
                <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Register</strong>
                </h5>

                <Form>
                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name = "firstName" 
                                    placeholder="First Name"
                                    onChange={e => setFirstName(e.target.value)}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name = "lastName" 
                                    placeholder="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    type="email" 
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)} 
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <Button 
                            variant="warning" 
                            type="submit"
                            class="col"
                            onClick={() => dispatch(register(email, password, firstName, lastName))}>
                                Register
                        </Button>
                        <div class="col"></div>
                    </Row>

                    <Row> 
                        <div class="col"></div>
                        <Link to="/login">Click here to Log in!</Link>
                        <div class="col"></div>
                    </Row>
                </Form>
            </div>

        </React.Fragment>
    );
}