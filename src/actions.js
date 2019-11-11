import axios from "./axios";

export async function login(email, password) {
    if (email.indexOf("@") == -1) {
        return {
            type: "LOGIN",
            isError: true
        };
    }
    
    try {
        await axios.post("/api/login", {
            email: email,
            password: password
        });
        return {
            type: "LOGIN"
        };
    } catch (e) {
        console.error(e);
        return {
            type: "LOGIN",
            isError: true
        };
    }
}

export async function register(email, password, firstName, lastName) {
    if (email.indexOf("@") == -1) {
        return {
            type: "REGISTER",
            isError: true
        };
    }
    
    try {
        await axios.post("/api/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
        return {
            type: "REGISTER"
        };
    } catch (e) {
        console.error(e);
        return {
            type: "REGISTER",
            isError: true
        };
    }
}

export async function getProfile() {
    try {
        const { data } = await axios.get("/api/profile");
        return {
            type: "GET_PROFILE",
            profile: {
                firstName: data.first_name,
                lastName: data.last_name,
                email: data.email,
                address: data.address,
                postcode: data.postcode,
                city: data.city,
                country: data.country,
            }
        };
    } catch (e) {
        console.error(e);
        return {
            type: "GET_PROFILE",
            isError: true
        };
    }
}

export async function editProfile(firstName, lastName, email, password, address, postcode, city, country) {
    if (email.indexOf("@") == -1) {
        return {
            type: "EDIT_PROFILE",
            isError: true
        };
    }

    try {
        await axios.post("/api/profile", {
            firstName: firstName, 
            lastName: lastName,
            email: email,
            password: password, 
            address: address, 
            postcode: postcode,
            city: city,
            country: country
        });
        return {
            type: "EDIT_PROFILE"
        };
    } catch (e) {
        console.error(e);
        return {
            type: "EDIT_PROFILE",
            isError: true
        };
    }
}

