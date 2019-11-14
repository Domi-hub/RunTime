import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Toast, Button, Row, Col, Form } from "react-bootstrap";
import Moment from "react-moment";
import { joinEvent, getEventAddress } from "./actions";

export default function EventDetails({ marker, show, onClose }) {
    const dispatch = useDispatch();

    const eventAddress = useSelector(state => state.eventAddress);

    useEffect(() => {
        dispatch(getEventAddress(marker.event.latitude, marker.event.longitude));
    }, []);

    return (
        <Toast style={{ position: 'absolute', top: marker.y, left: marker.x }} show={show} onClose={onClose}>
            <Toast.Header> 
                <strong className="mr-auto"> {marker.event.name} </strong>
            </Toast.Header>
            <Toast.Body>
                <Form>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Description </strong>
                                </Form.Label>
                                <p>
                                    {marker.event.description}
                                </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Address </strong>
                                </Form.Label>
                                {eventAddress && (
                                    <p> {eventAddress} </p>
                                )}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Date </strong>
                                </Form.Label>
                                <p>
                                    <Moment
                                        format="MMMM Do YYYY">
                                        {marker.event.date}
                                    </Moment>
                                </p>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>
                                    <strong> Time </strong>
                                </Form.Label>
                                <p>
                                    <Moment 
                                        parse="HH:mm:ss"
                                        format="HH:mm">
                                        {marker.event.time}
                                    </Moment>
                                </p>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {!marker.event.participation && (
                                <Button 
                                    variant="warning"
                                    onClick={() => {
                                        dispatch(joinEvent(marker.event.id));
                                        onClose();
                                    }}> 
                                    Join 
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Toast.Body>
        </Toast>
    )
}