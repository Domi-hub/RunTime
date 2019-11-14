import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from 'google-map-react';
import { getMapEvents } from "./actions";
import { Card } from "react-bootstrap";
import CreateEvent from "./create-event";
import Event from "./event";
import EventDetails from "./event-details";

export default function GoogleMap() {
    const dispatch = useDispatch();

    const events = useSelector(state => state.mapEvents);
    const [center, setCenter] = useState({lat: 52.519457, lng: 13.410072 });

    const [pointer, setPointer] = useState(null);
    const [showPointer, setShowPointer] = useState(false);

    const [marker, setMarker] = useState(null);
    const [showMarker, setShowMarker] = useState(false);

    useEffect(() => {
        dispatch(getMapEvents());
    }, []);

    return (
        <Card className="google-map">
            <GoogleMapReact
                options={{
                    fullscreenControl: false
                }}
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
                                onClick={(m) => {
                                    if (marker && marker.event.id === event.id) {
                                        marker.setIcon(showMarker ? "🔵" : "🔴");
                                        setShowMarker(!showMarker);
                                    } else {
                                        if (marker) {
                                            marker.setIcon("🔵");
                                        }
                                        m.event = event;
                                        setMarker(m);
                                        setShowMarker(true);
                                    }
                                }}
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

            {marker && showMarker && (
                <EventDetails
                    marker={marker}
                    show={showMarker}
                    onClose={() => {
                        marker.setIcon("🔵");
                        setShowMarker(false);
                    }} 
                    />
            )}
        </Card>
    );
}