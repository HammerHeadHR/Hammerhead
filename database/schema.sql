DROP DATABASE IF EXISTS hammerhead;

CREATE DATABASE hammerhead;

\c hammerhead;

CREATE TABLE users (
 id SERIAL NOT NULL PRIMARY KEY,
 username VARCHAR(50) NOT NULL,
 password VARCHAR(50) NOT NULL,
 team_id INTEGER NOT NULL,
 admin BOOLEAN DEFAULT false,
 active BOOLEAN DEFAULT true
);

CREATE TABLE teams (
 id SERIAL NOT NULL PRIMARY KEY,
 name VARCHAR(30) UNIQUE NOT NULL
);

ALTER TABLE users ADD CONSTRAINT users_team_id_fkey FOREIGN KEY (team_id) REFERENCES teams(id);

CREATE TABLE datasets (
 id SERIAL NOT NULL PRIMARY KEY,
 title VARCHAR(50) UNIQUE NOT NULL,
 owner_id INTEGER NOT NULL,
 team_id INTEGER NOT NULL,
 datapoints JSON NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE datasets ADD CONSTRAINT datasets_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id);
ALTER TABLE datasets ADD CONSTRAINT datasets_team_id_fkey FOREIGN KEY (team_id) REFERENCES teams(id);

CREATE TABLE notes (
 id SERIAL NOT NULL PRIMARY KEY,
 dataset_id INTEGER NOT NULL,
 owner_id INTEGER NOT NULL,
 body VARCHAR(500) NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE notes ADD CONSTRAINT notes_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES datasets(id);
ALTER TABLE notes ADD CONSTRAINT notes_owner_id_fkey FOREIGN KEY (owner_id) REFERENCES users(id);

CREATE TABLE notifications (
  id SERIAL NOT NULL PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  dataset_id INTEGER NOT NULL,
  viewed BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE notifications ADD CONSTRAINT notifications_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES users(id);
ALTER TABLE notifications ADD CONSTRAINT notifications_receiver_id_fkey FOREIGN KEY (receiver_id) REFERENCES users(id);
ALTER TABLE notifications ADD CONSTRAINT notifications_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES datasets(id);
