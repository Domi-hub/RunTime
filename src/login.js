import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./actions";
import { Form, Button, Row} from "react-bootstrap";

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

            <div class="card">
                <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Log In</strong>
                </h5>

                <Form>
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
                        onClick={() => dispatch(login(email, password))}
                        >
                        Login
                    </Button>
                    <div class="col"></div>
                </Row>

                <Row> 
                    <div class="col"></div>
                    <Link class="text-center" to="/register">Click here to Register!</Link>
                    <div class="col"></div>
                </Row>
                </Form>
            </div>
        </React.Fragment>
    );
}