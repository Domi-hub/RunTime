DROP TABLE IF EXISTS participants;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS profiles;
DROP TABLE IF EXISTS users;

CREATE TABLE users 
(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR NOT NULL UNIQUE,
    password VARCHAR NOT NULL,
    image VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profiles 
(
    id SERIAL PRIMARY KEY,
    address VARCHAR,
    postcode VARCHAR,
    city VARCHAR,
    country VARCHAR,
    user_id INT REFERENCES users(id) NOT NULL UNIQUE
);

CREATE TABLE events
(
    id SERIAL PRIMARY KEY,
    name VARCHAR, 
    description TEXT, 
    time TEXT,
    latitude FLOAT(6),
    longitute FLOAT(6),
    organizer_id INT REFERENCES users(id) NOT NULL UNIQUE

);

CREATE TABLE participants
(
    user_id INT REFERENCES users(id) NOT NULL UNIQUE,
    event_id INT REFERENCES events(id) NOT NULL UNIQUE,
    PRIMARY KEY(user_id, event_id),
    CONSTRAINT user_event_id UNIQUE (event_id)
);

INSERT INTO users (first_name, last_name, email, password, image) 
VALUES
('Loki', 'Stause', 'coriander0@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://randomuser.me/api/portraits/men/56.jpg'),
('MacKenzie', 'Cooke', 'coriander1@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://m.media-amazon.com/images/M/MV5BNzQyNTgzOTI2OF5BMl5BanBnXkFtZTgwNTMyMDk0NjE@._V1_UX172_CR0,0,172,256_AL_.jpg'),
('Alexandra', 'Mbatha-Raw', 'coriander2@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://m.media-amazon.com/images/M/MV5BMDJmZGRjNzktYTFlYS00ZDdhLWExNTUtNTRjNTY5MTU3Y2FhXkEyXkFqcGdeQXVyOTQzMTcwMzQ@._V1_UX172_CR0,0,172,256_AL_.jpg'),
('Ferdinand', 'Hayek', 'coriander3@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images.pexels.com/photos/576924/pexels-photo-576924.jpeg?h=350&auto=compress&cs=tinysrgb'),
('Randolph', 'Kurylenko', 'coriander4@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images-na.ssl-images-amazon.com/images/M/MV5BZDkxMjI3MTMtYzM2NS00YjQzLWJkNjQtMzZiYTJmMzlhNDE3XkEyXkFqcGdeQXVyMTg2MTgxNjM@._V1_UY256_CR24,0,172,256_AL_.jpg'),
('Rafa', 'Moore', 'coriander5@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://randomuser.me/api/portraits/men/77.jpg'),
('Marty', 'Rogers', 'coriander6@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images.pexels.com/photos/412840/pexels-photo-412840.jpeg?h=350&auto=compress&cs=tinysrgb'),
('Kaine', 'Bright', 'coriander7@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://randomuser.me/api/portraits/men/91.jpg'),
('Miyah', 'Seppanen', 'coriander8@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTQwMDQ0NDk1OV5BMl5BanBnXkFtZTcwNDcxOTExNg@@._V1_UY256_CR2,0,172,256_AL_.jpg'),
('Stu', 'Ngo', 'coriander9@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images.unsplash.com/photo-1507120878965-54b2d3939100?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=99fbace66d1bfa48c9c6dc8afcac3aab')