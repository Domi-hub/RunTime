import axios from "./axios";

export async function login(email, password) {
    if (email.indexOf("@") == -1) {
        return {
            type: "LOGIN",
            isError: true
        };
    }
    
    try {
        await axios.post("/login", {
            email: email,
            password: password
        });
    } catch (e) {
        console.error(e);
        return {
            type: "LOGIN",
            isError: true
        };
    }

    return {
        type: "LOGIN"
    };
}

export async function register(email, password, firstName, lastName) {
    if (email.indexOf("@") == -1) {
        return {
            type: "REGISTER",
            isError: true
        };
    }
    
    try {
        await axios.post("/register", {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName
        });
    } catch (e) {
        console.error(e);
        return {
            type: "REGISTER",
            isError: true
        };
    }

    return {
        type: "REGISTER"
    };
}