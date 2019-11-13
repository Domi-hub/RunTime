import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "./actions";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function Login() {
    const dispatch = useDispatch();
    const isError = useSelector(state => state.isError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Fragment>
            {isError && (
                <Fragment> Something went wrong. </Fragment>
            )}

            <Card className="card">
                <Card.Header className="text-center">
                    <strong> Log In </strong>
                </Card.Header>

                <Form>
                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    name="email"
                                    type="email" 
                                    autoComplete="email"
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)} 
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Button 
                                variant="warning"
                                onClick={() => dispatch(login(email, password))}
                                >
                                Login
                            </Button>
                        </Col>
                        <Col />
                    </Row>

                    <Row> 
                        <Col />
                        <Link to="/register">Click here to Register</Link>
                        <Col />
                    </Row>
                </Form>
            </Card>
        </Fragment>
    );
}