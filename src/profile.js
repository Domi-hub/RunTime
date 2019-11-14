import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, editProfile } from "./actions";
import { Form, Button, Row, Col, Card, Image } from "react-bootstrap";
import ImageUploader from "./image-uploader";

export default function Profile() {
    const dispatch = useDispatch();
    
    const isError = useSelector(state => state.isError);
    const profile = useSelector(state => state.profile);
    const imageUrl = useSelector(state => state.imageUrl);

    useEffect(() => {
        dispatch(getProfile());
    }, [imageUrl]);

    return (
        <Fragment>
            {isError && (
                <Fragment> Something went wrong. </Fragment>
            )}
            {profile && (
                <EditProfile profile={profile} />
            )}
        </Fragment>
    );
}

function EditProfile({ profile }) {
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState(profile.address);
    const [postcode, setPostcode] = useState(profile.postcode);
    const [city, setCity] = useState(profile.city);
    const [country, setCountry] = useState(profile.country);

    return (
        <Fragment>
            <Card>
                <Card.Header className="text-center">
                    <strong> Edit Profile </strong>
                </Card.Header>
                <Form>
                    <Row>
                        <Col />
                        <Col>
                            <Image
                                style={{ height: "25vh" }}
                                src={profile.imageUrl === "" ? "/default.jpeg" : profile.imageUrl }
                                alt={profile.firstName + " " + profile.lastName}
                                rounded
                            />
                        </Col>
                        <Col />
                    </Row>
                    <Row>
                        <Col />
                        <Col>
                            <Form.Group style={{ margin: "20px" }}>
                                <ImageUploader />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>
                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name = "firstName" 
                                    placeholder="First Name"
                                    autoComplete="first-name"
                                    onChange={e => setFirstName(e.target.value)}
                                    defaultValue={firstName}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    name="address"
                                    placeholder="Address"
                                    autoComplete="address"
                                    onChange={e => setAddress(e.target.value)}
                                    defaultValue={address}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name = "lastName" 
                                    placeholder="Last Name"
                                    autoComplete="last-name"
                                    onChange={e => setLastName(e.target.value)}
                                    defaultValue={lastName}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control 
                                    name="postcode"
                                    placeholder="Postcode"
                                    autoComplete="postcode"
                                    onChange={e => setPostcode(e.target.value)}
                                    defaultValue={postcode}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    type="email" 
                                    placeholder="Email"
                                    autoComplete="email"
                                    onChange={e => setEmail(e.target.value)} 
                                    defaultValue={email}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                    name="city"
                                    placeholder="City"
                                    autoComplete="city"
                                    onChange={e => setCity(e.target.value)}
                                    defaultValue={city}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Password"
                                    autoComplete="current-password"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group>
                                <Form.Label>Country</Form.Label>
                                <Form.Control 
                                    name="country"
                                    placeholder="Country"
                                    autoComplete="country"
                                    onChange={e => setCountry(e.target.value)}
                                    defaultValue={country}
                                    />
                            </Form.Group>
                        </Col>
                        <Col />
                    </Row>

                    <Row>
                        <Col />
                        <Col>
                            <Button 
                                variant="warning"
                                onClick={() => dispatch(editProfile(firstName, lastName, email, password, address, postcode, city, country))}> 
                                    Save
                            </Button>
                        </Col>
                        <Col>
                            <Link to="/"> Skip </Link>
                        </Col>
                        <Col />
                    </Row>
                </Form>
            </Card>
        </Fragment>
    );
};