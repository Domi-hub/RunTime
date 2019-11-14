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
           <Card style={{ border: '0px' }}>
                <Card.Img src="./run.jpeg" alt="Card image" />
                <Card.ImgOverlay>
                    <Row>
                        <Col />
                        <Col>
                            <Card bg="light" style={{ opacity: 0.9 }}>
                                <Card.Header className="text-center">
                                    <strong> Log In </strong>
                                </Card.Header>

                                <Card.Body>
                                    <Form>
                                        <Row>
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
                                        </Row>

                                        <Row>
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
                                        </Row>

                                        {isError && (
                                            <Row>
                                                <Col>
                                                    <small> Something went wrong. </small>
                                                </Col>
                                            </Row>
                                        )}

                                        <Row>
                                            <Col>
                                                <Button 
                                                    variant="warning"
                                                    block
                                                    onClick={() => dispatch(login(email, password))}
                                                    >
                                                    Login
                                                </Button>
                                            </Col>
                                        </Row>

                                        <Row> 
                                            <Col>
                                                <p className="text-center">
                                                    <Link 
                                                        to="/register">
                                                            Click here to Register
                                                    </Link>
                                                </p>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col />
                    </Row>
                </Card.ImgOverlay>
            </Card>
        </Fragment>
    );
}