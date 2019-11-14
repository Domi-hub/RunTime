import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Toast } from "react-bootstrap";
import { addMapEvent, getNewEventAddress } from "./actions";

export default function CreateEvent({ pointer, show, onClose }) {
    const dispatch = useDispatch();

    const newEventAddress = useSelector(state => state.newEventAddress);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        dispatch(getNewEventAddress(pointer.lat, pointer.lng));
    }, []);

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
                                <Form.Label>
                                    <strong> Address </strong>
                                </Form.Label>
                                {newEventAddress && (
                                    <p> {newEventAddress} </p>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Name </strong>
                                </Form.Label>
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
                                <Form.Label>
                                    <strong> Description </strong>
                                </Form.Label>
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
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Date </strong>
                                </Form.Label>
                                <Form.Control
                                    name = "date" 
                                    type="date"
                                    onChange={e => setDate(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Time </strong>
                                </Form.Label>
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
                            <Button 
                                variant="warning"
                                onClick={() => {
                                    dispatch(addMapEvent(pointer.lat, pointer.lng, name, description, date, time));
                                    onClose();
                                }}> 
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