import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, editProfile } from "./actions";
import { Form, Button, Row} from "react-bootstrap";

export default function Profile() {
    const dispatch = useDispatch();
    
    const isError = useSelector(state => state.isError);
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfile());
    });

    return (
        <React.Fragment>
            {isError && (
                <React.Fragment>Something went wrong.</React.Fragment>
            )}
            {profile && (
                <EditProfile profile={profile} />
            )}
        </React.Fragment>
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
        <React.Fragment>
            <div class="card">
                <h5 class="card-header info-color white-text text-center py-4">
                    <strong>Profile</strong>
                </h5>

                <Form>
                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    name = "firstName" 
                                    placeholder="First Name"
                                    onChange={e => setFirstName(e.target.value)}
                                    defaultValue={firstName}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    name = "lastName" 
                                    placeholder="Last Name"
                                    onChange={e => setLastName(e.target.value)}
                                    defaultValue={lastName}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control 
                                    name="email"
                                    type="email" 
                                    placeholder="Email"
                                    onChange={e => setEmail(e.target.value)} 
                                    defaultValue={email}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control 
                                    name="password"
                                    type="password" 
                                    placeholder="Password"
                                    onChange={e => setPassword(e.target.value)}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Address</Form.Label>
                                <Form.Control 
                                    name="address"
                                    placeholder="Address"
                                    onChange={e => setAddress(e.target.value)}
                                    defaultValue={address}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Postcode</Form.Label>
                                <Form.Control 
                                    name="postcode"
                                    placeholder="Postcode"
                                    onChange={e => setPostcode(e.target.value)}
                                    defaultValue={postcode}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>City</Form.Label>
                                <Form.Control 
                                    name="city"
                                    placeholder="City"
                                    onChange={e => setCity(e.target.value)}
                                    defaultValue={city}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <div class="col">
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Country</Form.Label>
                                <Form.Control 
                                    name="country"
                                    placeholder="Country"
                                    onChange={e => setCountry(e.target.value)}
                                    defaultValue={country}
                                    />
                            </Form.Group>
                        </div>
                        <div class="col"></div>
                    </Row>

                    <Row>
                        <div class="col"></div>
                        <Button 
                            variant="warning" 
                            type="submit"
                            class="col"
                            onClick={() => dispatch(editProfile(firstName, lastName, email, password, address, postcode, city, country))}> 
                                Save
                        </Button>
                        <div class="col"></div>
                    </Row>

                    <Row> 
                        <div class="col"></div>
                        <Link to="/">Skip</Link>
                        <div class="col"></div>
                    </Row>
                </Form>
            </div>
        </React.Fragment>
    );
};