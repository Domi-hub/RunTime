import React from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Card, Container, Button } from "react-bootstrap";
import Moment from "react-moment";
import { deleteMyEvent } from "./actions"

export default function OrganizedEvents({ organizedEvents }) {
    const dispatch = useDispatch();

    return(
        <Container>
            <h3 
                className="text-center"
                style={{ marginTop: "30px", marginBottom: "30px" }}>
                    📅 Organized Events
            </h3>
            <Container>
                {organizedEvents.map(event => (
                    <Card 
                        key={event.id} 
                        style={{marginBottom: "20px"}} 
                        border="warning">
                            <Card.Header style={{backgroundColor: "#ffc107", color: "#ffffff"}}>
                                <Row className="align-items-center">
                                    <Col>
                                        <strong> 📅 {event.name} </strong>
                                    </Col>
                                    <Col>
                                        <Button
                                            className="float-right"
                                            variant="danger"
                                            onClick={() => dispatch(deleteMyEvent(event.id))}>
                                            Delete
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <p> {event.description} </p>
                                <Row>
                                    <Col>
                                        <strong>Date: </strong> 
                                        <Moment format="MMMM Do YYYY">
                                            {event.date}
                                        </Moment>
                                    </Col>
                                    <Col>
                                        <strong>Time: </strong>
                                        <Moment 
                                            parse="HH:mm:ss"
                                            format="HH:mm">
                                            {event.time}
                                        </Moment>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <strong>Participants: </strong>
                                        {event.participants}
                                    </Col>
                                    <Col />
                                </Row>
                            </Card.Body>
                    </Card>
                ))}
            </Container>

        </Container>
    )
}