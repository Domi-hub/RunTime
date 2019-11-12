import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Card } from "react-bootstrap";

export default function GoogleMap() {
    const [center, setCenter] = useState({lat: 52.519457, lng: 13.410072 });
    const [zoom, setZoom] = useState(11);

    return (
        <Card className="google-map">
            <GoogleMapReact
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <Marker
                    lat={52.531967}
                    lng={13.320829}
                />

                <Marker
                    lat={52.508699}
                    lng={13.442507}
                />
            </GoogleMapReact>
        </Card>
    );
}

function Marker() {
    return (
        <h1>*</h1>
    )
}