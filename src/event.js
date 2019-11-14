import React, { useState } from 'react';

export default function Event({ onClick }) {
    const [icon, setIcon] = useState("🔵");

    return (
        <div
            style={{ height: "15px", width: "15px", cursor: "pointer" }}
            onClick={(event) => {
                setIcon("🔴");
                onClick({x: event.clientX, y: event.clientY, setIcon: setIcon});
        }}>
             {icon}
        </div>
    )
}