import axios from "./axios";

const key = ""

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
                imageUrl: data.image_url,
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

export async function uploadImage(image) {
    try {
        var form = new FormData();
        form.append("image", image);
        const { data } = await axios.post("/api/image", form);
        return {
            type: "UPLOAD_IMAGE",
            imageUrl: data.imageUrl
        };
    } catch (e) {
        console.error(e);
        return {
            type: "UPLOAD_IMAGE",
            isError: true
        };
    }
}

export async function getMyEvents() {
    try {
        const { data } = await axios.get("/api/events");
        return {
            type: "GET_MY_EVENTS",
            myEvents: data.events
        };
    } catch (e) {
        console.error(e);
        return {
            type: "GET_MY_EVENTS",
            isError: true
        };
    }
}

export async function getMapEvents() {
    try {
        const { data } = await axios.get("/api/map");
        return {
            type: "GET_MAP_EVENTS",
            mapEvents: data.events
        };
    } catch (e) {
        console.error(e);
        return {
            type: "GET_MAP_EVENTS",
            isError: true
        };
    }
}

export async function addMapEvent(latitude, longitude, name, description, date, time) {
    try {
        let event = {
            latitude: latitude,
            longitude: longitude,
            name: name,
            description: description,
            date: date,
            time: time
        }
        const { data } = await axios.post("/api/event", event);
        event.id = data.id;
        event.participation = 1;
        
        return {
            type: "ADD_MAP_EVENT",
            mapEvent: event
        };
    } catch (e) {
        console.error(e);
        return {
            type: "ADD_MAP_EVENT",
            isError: true
        };
    }
}

export async function getNewEventAddress(latitude, longitude) {
    try {
        const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&key=" + key);

        let address = "";
        if (data.results.length > 0) {
            address = data.results[0].formatted_address;
        }

        return {
            type: "GET_NEW_EVENT_ADDRESS",
            newEventAddress: address
        }
    } catch (e) {
        console.error(e);
        return {
            type: "GET_NEW_EVENT_ADDRESS",
            newEventAddress: ""
        };
    }
}

export async function getEventAddress(latitude, longitude) {
    try {
        const { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=" 
            + latitude + "," 
            + longitude 
            + "&key=" + key);

        let address = "";
        if (data.results.length > 0) {
            address = data.results[0].formatted_address;
        }

        return {
            type: "GET_EVENT_ADDRESS",
            eventAddress: address
        }
    } catch (e) {
        console.error(e);
        return {
            type: "GET_EVENT_ADDRESS",
            eventAddress: ""
        };
    }
}

export async function getUserLocation() {
    let location = {lat: 52.519457, lng: 13.410072 };
    try {
        var { data } = await axios.get("/api/profile")
        var { data } = await axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" 
        + data.address.split(" ").join("+") + "," 
        + data.postcode.split(" ").join("+") + "," 
        + data.city.split(" ").join("+") + "," 
        + data.country.split(" ").join("+")
        + "&key=" + key);

        if (data.results.length > 0) {
            location = data.results[0].geometry.location;
        }

        return {
            type: "GET_USER_LOCATION",
            userLocation: location
        }
    } catch (e) {
        console.error(e);
        return {
            type: "GET_USER_LOCATION",
            userLocation: location
        };
    }
}

export async function joinEvent(id) {
    try {
        await axios.post("/api/event/" + id);
        
        return {
            type: "JOIN_EVENT",
            joinedEventId: id
        };
    } catch (e) {
        console.error(e);
        return {
            type: "JOIN_EVENT",
            isError: true
        };
    }
}

export async function deleteMyEvent(id) {
    try {
        await axios.delete("/api/event/" + id);
        
        return {
            type: "DELETE_MY_EVENT",
            myDeletedEventId: id
        };
    } catch (e) {
        console.error(e);
        return {
            type: "DELETE_MY_EVENT",
            isError: true
        };
    }
}

export async function cancelMyParticipation(id) {
    try {
        await axios.delete("/api/participation/" + id);
        
        return {
            type: "CANCEL_MY_PARTICIPATION",
            myCanceledParticipatingEventId: id
        };
    } catch (e) {
        console.error(e);
        return {
            type: "CANCEL_MY_PARTICIPATION",
            isError: true
        };
    }
}