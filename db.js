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
        SELECT first_name, last_name, email, address, postcode, city, country
        FROM users
        LEFT JOIN profiles
        ON users.id = profiles.user_id
        WHERE users.id = $1;
        `,
        [userId]
    )
}

module.exports.updateUserPrimaryInfo = (firstName, lastName, email, userId) => {
    return db.query(
        `
        UPDATE users 
        SET first_name = $1, last_name =$2, email = $3
        WHERE id = $4;
        `,
        [firstName, lastName, email, userId]
    )
}

module.exports.updateUserPassword = (password, userId) => {
    return db.query(
        `
        UPDATE users
        SET password = $1
        WHERE id = $2;
        `,
        [password, userId]
    )
}

module.exports.upsertUserAdditionalInfo = (address, postcode, city, country, userId) => {
    return db.query(
        `
        INSERT INTO profiles (address, postcode, city, country, user_id)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (user_id)
        DO UPDATE SET address = $1, postcode = $2, city = $3, country = $4
        RETURNING id
        `,
        [address, postcode, city, country, userId]
    )
}
