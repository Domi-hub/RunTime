import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "./actions";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function Register() {
    const dispatch = useDispatch();
    const isError = useSelector(state => state.isError);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    return (
        <Fragment>
            {isError && (
                <Fragment> Something went wrong. </Fragment>
            )}

            <Card>
                <Card.Header className="text-center">
                    <strong> Register </strong>
                </Card.Header>

                <Form>
                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name = "firstName" 
                                    placeholder="First Name"
                                    autoComplete="first-name"
                                    onChange={e => setFirstName(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name = "lastName" 
                                    placeholder="Last Name"
                                    autoComplete="last-name"
                                    onChange={e => setLastName(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

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
                                onClick={() => dispatch(register(email, password, firstName, lastName))}>
                                    Register
                            </Button>
                        </Col>
                        <Col />
                    </Row>

                    <Row> 
                    <Col />
                        <Link to="/login">Click here to Log In</Link>
                        <Col />
                    </Row>
                </Form>
            </Card>

        </Fragment>
    );
}