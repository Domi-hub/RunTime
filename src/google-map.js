import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Card } from "react-bootstrap";

export default function GoogleMap() {
    const [center, setCenter] = useState({lat: 59.95, lng: 30.33 });
    const [zoom, setZoom] = useState(11);

    return (
        <Card className="google-map">
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={59.955413}
                    lng={30.337844}
                />

                <Marker
                    lat={59.955417}
                    lng={30.337844}
                />

                <Marker
                    lat={59.955409}
                    lng={30.337844}
                />
            </GoogleMapReact>
        </Card>
    );
}

function Marker() {
    return (
        <div>Hello</div>
    )
}