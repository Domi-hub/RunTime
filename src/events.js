import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, editProfile } from "./actions";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

export default function Events() {
    //const organizedEvents = events.organizedEvents;
    //const participatingEvents = events.organizedEvents;

    return ( 
        <Card>Todo</Card>
        //<OrganizedEvents organizedEvents={organizedEvents} />
        //<ParticipatingEvents participatingEvents={participatingEvents} />
    );
}

function OrganizedEvents({ organizedEvents }) {
    return null;
}

function ParticipatingEvents({ participatingEvents }) {
    return null;
}