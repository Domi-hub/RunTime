import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfile, editProfile } from "./actions";

export default function Profile() {
    const dispatch = useDispatch();
    
    const isError = useSelector(state => state.isError);
    const profile = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfile());
    });

    return (
        <React.Fragment>
            <h1>Profile</h1>
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
            <input
                name="firstName"
                placeholder="First Name"
                onChange={e => setFirstName(e.target.value)}
                defaultValue={firstName}
            />
            <input
                name="lastName"
                placeholder="Last Name"
                onChange={e => setLastName(e.target.value)}
                defaultValue={lastName}
            />
            <input
                name="email"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
                defaultValue={email}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={e => setPassword(e.target.value)}
            />
            <input
                name="address"
                placeholder="Address"
                onChange={e => setAddress(e.target.value)}
                defaultValue={address}
            />
            <input
                name="postcode"
                placeholder="Postcode"
                onChange={e => setPostcode(e.target.value)}
                defaultValue={postcode}
            />
            <input
                name="city"
                placeholder="City"
                onChange={e => setCity(e.target.value)}
                defaultValue={city}
            />
            <input
                name="country"
                placeholder="Country"
                onChange={e => setCountry(e.target.value)}
                defaultValue={country}
            />
            <button onClick={() => dispatch(editProfile(firstName, lastName, email, password, address, postcode, city, country))}> 
                Save 
            </button>
            <Link to="/">Skip</Link>
        </React.Fragment>
    );
};