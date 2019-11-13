import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyEvents } from "./actions";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function Events() {
    const dispatch = useDispatch();
    
    const isError = useSelector(state => state.isError);
    const events = useSelector(state => state.events);

    useEffect(() => {
        dispatch(getMyEvents());
    }, []);

    if (!events) {
        return null;
    }

    return ( 
        <Fragment>
            <OrganizedEvents organizedEvents={events.organized} />
            <ParticipatingEvents participatingEvents={events.participating} />
        </Fragment>
    );
}

function OrganizedEvents({ organizedEvents }) {
    console.log(organizedEvents);
    return null;
}

function ParticipatingEvents({ participatingEvents }) {
    console.log(participatingEvents);
    return null;
}