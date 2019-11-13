import React, { Fragment, useState } from 'react';
import { Card, Button } from "react-bootstrap";

export default function Event({ lat, lng }) {
    const [showDetails, setShowDetails] = useState(false)

    return (
        <Fragment>
            <h1 onClick={() => setShowDetails(!showDetails)}>
                🚩
            </h1>
            {showDetails && (
                <Card style={{ height: "30vh", width: "30vh" }}>
                    <Card.Title> Event Name </Card.Title>
                    <Card.Subtitle> {lat} {lng} </Card.Subtitle>
                    <Card.Body> Come and join us! </Card.Body>
                    <Button> Join </Button>
                </Card>
            )}
        </Fragment>
    )
}