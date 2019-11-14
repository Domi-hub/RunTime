import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
import { uploadImage } from "./actions"

export default function ImageUploader() {
    const dispatch = useDispatch();

    const [image, setImage] = useState(null);
    
    return (
        <Form.Group>
            <Row style={{ marginTop: "32px" }}>
                <Col />
                <Col>
                    <Form.Control
                        name="image"
                        type="file"
                        placeholder="Image"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                    />
                </Col>
                <Col>
                    <Button onClick={() => dispatch(uploadImage(image))}>
                        Upload
                    </Button>
                </Col>
                <Col />
            </Row>
        </Form.Group>
    );
}