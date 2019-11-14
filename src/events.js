import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEvents } from "./actions";
import { Row, Col, Container } from "react-bootstrap";
import OrganizedEvents from "./organized-events";
import ParticipatingEvents from "./participating-events";

export default function Events() {
    const dispatch = useDispatch();
    
    const isError = useSelector(state => state.isError);
    const organizedEvents = useSelector(state => state.organizedEvents);
    const participatingEvents = useSelector(state => state.participatingEvents);

    useEffect(() => {
        dispatch(getMyEvents());
    }, []);

    return ( 
        <Fragment>
            <Container> 
            <Row>
                <Col md={6}>
                    {organizedEvents && (
                        <OrganizedEvents organizedEvents={organizedEvents} />
                    )}
                </Col>

                <Col md={6}>
                    {participatingEvents && (
                        <ParticipatingEvents participatingEvents={participatingEvents} />
                    )}
                </Col>
            </Row> 
            </Container>
        </Fragment>
    );
}