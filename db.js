const spicedPg = require("spiced-pg");
const db = spicedPg(`postgres:postgres:postgres@localhost:5432/runtime`);

module.exports.addRegisteredUser = (firstName, lastName, email, password) => {
    return db.query(
        `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES($1, $2, $3, $4)
        RETURNING id;
        `,
        [firstName, lastName, email, password]
    );
};

module.exports.getUserByEmail = (email) => {
    return db.query(
        `
        SELECT *
        FROM users
        WHERE email = $1;
        `,
        [email]
    );
};

module.exports.getUserPrimaryInfo = (userId) => {
    return db.query(
        `
        SELECT first_name, last_name, image_url, email, address, postcode, city, country
        FROM users
        LEFT JOIN profiles
        ON users.id = profiles.user_id
        WHERE users.id = $1;
        `,
        [userId]
    );
};

module.exports.updateUserPrimaryInfo = (firstName, lastName, email, userId) => {
    return db.query(
        `
        UPDATE users 
        SET first_name = $1, last_name =$2, email = $3
        WHERE id = $4;
        `,
        [firstName, lastName, email, userId]
    );
};

module.exports.updateUserPassword = (password, userId) => {
    return db.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2;
        `,
        [password, userId]
    );
};

module.exports.upsertUserAdditionalInfo = (address, postcode, city, country, userId) => {
    return db.query(
        `
        INSERT INTO profiles (address, postcode, city, country, user_id)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id)
        DO UPDATE SET address = $1, postcode = $2, city = $3, country = $4
        RETURNING id;
        `,
        [address, postcode, city, country, userId]
    );
};

module.exports.updateImage = (imageUrl, userId) => {
    return db.query(
        `
        UPDATE users
        SET image_url = $1
        WHERE id = $2;
        `,
        [imageUrl, userId]
    );
};

module.exports.getEvents = (userId) => {
    return db.query(
        `
        SELECT events.*, COUNT(participants.id) as participants
        FROM events
        LEFT JOIN participants
        ON events.id = participants.event_id
        WHERE organizer_id = $1
        OR events.id IN (
            SELECT event_id FROM participants
            WHERE user_id = $1
        )
        GROUP BY events.id;
        `,
        [userId]
    );
};

module.exports.getMapEvents = (userId) => {
    return db.query(
        `
        SELECT id, latitude, longitude, name, description, date, time, (
            SELECT 1
            FROM participants
            WHERE participants.event_id = events.id
            AND participants.user_id = $1
        ) as participation
        FROM events;
        `,
        [userId]
    );
};

module.exports.addEvent = (latitude, longitude, name, description, date, time, organizerId) => {
    return db.query(
        `
        INSERT INTO events (latitude, longitude, name, description, date, time, organizer_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
        `,
        [latitude, longitude, name, description, date, time, organizerId]
    );
}

module.exports.addParticipant = (eventId, userId) => {
    return db.query(
        `
        INSERT INTO participants (event_id, user_id)
        VALUES ($1, $2)
        RETURNING event_id as id;
        `,
        [eventId, userId]
    );
}

module.exports.deleteParticipants = (eventId) => {
    return db.query(
        `
        DELETE FROM participants
        WHERE event_id = $1
        `,
        [eventId]
    );
}

module.exports.deleteEvent = (eventId, userId) => {
    return db.query(
        `
        DELETE FROM events
        WHERE id = $1
        AND organizer_id = $2; 
        `,
        [eventId, userId]
    );
}

module.exports.deleteParticipant = (eventId, userId) => {
    return db.query(
        `
        DELETE FROM participants
        WHERE event_id = $1
        AND user_id = $2
        `,
        [eventId, userId]
    );
}