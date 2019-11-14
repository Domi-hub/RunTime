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
    image_url VARCHAR(300),
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
    name VARCHAR NOT NULL, 
    description TEXT,
    date date NOT NULL,
    time time NOT NULL,
    latitude FLOAT(6) NOT NULL,
    longitude FLOAT(6) NOT NULL,
    organizer_id INT REFERENCES users(id) NOT NULL
);

CREATE TABLE participants
(
    id SERIAL,
    user_id INT REFERENCES users(id) NOT NULL,
    event_id INT REFERENCES events(id) NOT NULL,
    PRIMARY KEY (user_id, event_id)
);

INSERT INTO users (first_name, last_name, email, password, image_url) 
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
('Stu', 'Ngo', 'coriander9@example.com', '$2y$12$pFettvWn59xj2HDX5ovCJe/Mqjf3NSFhjXJG1.NZMz.LZUMnUUR2u', 'https://images.unsplash.com/photo-1507120878965-54b2d3939100?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=99fbace66d1bfa48c9c6dc8afcac3aab');

INSERT INTO profiles (address, postcode, city, country, user_id)
VALUES
('Mlynská 883/12', '040 01', 'Košice', 'Slovakia', '1'),
('Leipziger Str. 125', '10117', 'Berlin', 'Deutschland', '2'),
('Horner Weg 94', '20535', 'Hamburg', 'Deutschland', '3'),
('229 Avenue Jean Lolive', '93500', 'Pantin', 'France', '4');

INSERT INTO events (name, description, date, time, latitude, longitude, organizer_id)
VALUES
('Sunday Run', 'Run in Tiergarden.', '2019-11-24', '19:00', '52.514382', '13.338356', '3'),
('Start week with running', 'Lets meet in front of the S-bahn station Humbolthain and run.', '2019-11-25', '07:00', '52.544606', '13.378545', '2'),
('Evening run', 'We will meet in front of the Schloss Charlotenburg', '2019-11-29', '20:00', '52.520056', '13.296104', '3'),
('Run and sighseeing', 'We will start run in front of the Branderburg tor and Reichstag. PS: I will wear red t-shirt', '2019-11-28', '19:30', '52.516275', '13.377500', '3'),
('Wake up with run', 'Lets start Saturday with a run.', '2019-11-28', '07:00', '52.541779', '13.333698', '2');

INSERT INTO participants (user_id, event_id)
VALUES
('4', '1'),
('6', '1'),
('3', '2'),
('2', '4'),
('3', '5'),
('7', '2'),
('2', '3'),
('9', '2'),
('10', '4'),
('7', '5');