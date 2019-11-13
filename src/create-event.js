import React, { useState } from 'react';
import { Form, Button, Row, Col, Toast } from "react-bootstrap";

export default function CreateEvent({ pointer, show, onClose }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    return (
        <Toast style={{ position: 'absolute', top: pointer.y, left: pointer.x }} show={show} onClose={onClose}>
            <Toast.Header> 
                <strong className="mr-auto"> Create Event </strong>
            </Toast.Header>
            <Toast.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    name = "name" 
                                    placeholder="Name"
                                    autoComplete="name"
                                    onChange={e => setName(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    name = "date" 
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    name = "description" 
                                    placeholder="Description"
                                    autoComplete="description"
                                    as="textarea"
                                    rows="2"
                                    onChange={e => setDescription(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Time</Form.Label>
                                <Form.Control
                                    name = "time" 
                                    type="time"
                                    onChange={e => setTime(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col />
                        <Col>
                            <Button variant="warning"> 
                                    Save
                            </Button>
                        </Col>
                        <Col />
                    </Row>
                </Form>
            </Toast.Body>
        </Toast>
    )
}