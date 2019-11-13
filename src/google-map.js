import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from 'google-map-react';
import { getMapEvents } from "./actions";
import { Card } from "react-bootstrap";
import CreateEvent from "./create-event";
import Event from "./event";

export default function GoogleMap() {
    const dispatch = useDispatch();

    const events = useSelector(state => state.events);
    const [center, setCenter] = useState({lat: 52.519457, lng: 13.410072 });
    const [pointer, setPointer] = useState(null);
    const [showPointer, setShowPointer] = useState(false);

    useEffect(() => {
        dispatch(getMapEvents());
    }, []);

    return (
        <Card className="google-map">
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={12}
                onClick={(pointer) => {
                    setPointer(pointer);
                    setShowPointer(true);
                }}
            >
                {events && events.map((event) => {
                    return (
                        <Event
                            key={event.id}
                            lat={event.latitude}
                            lng={event.longitude}
                        />
                    );
                })}
            </GoogleMapReact>

            {pointer && showPointer && (
                <CreateEvent
                    pointer={pointer}
                    show={showPointer}
                    onClose={() => setShowPointer(false)}
                />
            )}
        </Card>
    );
}