DROP DATABASE IF EXISTS hammerhead;

CREATE DATABASE hammerhead;

\c hammerhead;

CREATE TABLE users (
 id SERIAL NOT NULL PRIMARY KEY,
 username VARCHAR(50) UNIQUE NOT NULL,
 password VARCHAR(64) NOT NULL,
 salt VARCHAR(64) NOT NULL,
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


INSERT INTO teams (name) VALUES ('Agriculture');
INSERT INTO teams (name) VALUES ('Crypto');
INSERT INTO teams (name) VALUES ('Admin');


INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('AlfredSmith', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('BobFranklin', 2, 'caf71a3df1134c0c7910a7897777048524aaf075cf6b2b627cee3c0a3e2d33c8', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', true);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('RachelJones', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('SamanthDaggerton', 2, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', true);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('IanJenkins', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('WebsterMcClaren', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('JayRobertson', 2, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('HilaryNewman', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', true);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('RubyWilliams', 2, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', true);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('JosephWright', 1, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('ThomasPhillips', 2, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', false);
INSERT INTO USERS (username, team_id, password, salt, admin) VALUES ('RaymondRaymonds', 3, '7cde366c4fb70278890699be263196d75d1892d052766b8015fe9197419f86ac', '8ef18a08397f7d5bf21928270f0bf447e7439ce8e4a5c9566586979f647b1f1e', true);

INSERT INTO datasets
  (title, datapoints, owner_id, team_id)
VALUES
  ('Soybeans', '[{"Year":"2011","Bushels (Billion)":"3.1"},{"Year":"2012","Bushels (Billion)":"3.04"},{"Year":"2013","Bushels (Billion)":"3.36"},{"Year":"2014","Bushels (Billion)":"3.93"},{"Year":"2015","Bushels (Billion)":"3.93"},{"Year":"2016","Bushels (Billion)":"4.3"},{"Year":"2017","Bushels (Billion)":"4.41"},{"Year":"2018","Bushels (Billion)":"4.43"},{"Year":"2019","Bushels (Billion)":"3.55"},{"Year":"2020","Bushels (Billion)":"4.14"}]', 1, 1);

INSERT INTO datasets
  (title, datapoints, owner_id, team_id)
VALUES
  ('Bitcoin', '[{"Year":"2012","Bitcoin Price ($)":"5.27"},{"Year":"2013","Bitcoin Price ($)":"13.3"},{"Year":"2014","Bitcoin Price ($)":"770.44"},{"Year":"2015","Bitcoin Price ($)":"313.92"},{"Year":"2016","Bitcoin Price ($)":"434.46"},{"Year":"2017","Bitcoin Price ($)":"997.69"},{"Year":"2018","Bitcoin Price ($)":"13412.44"},{"Year":"2019","Bitcoin Price ($)":"3869.47"},{"Year":"2020","Bitcoin Price ($)":"7188.46"},{"Year":"2021","Bitcoin Price ($)":"29391.78"}]', 2, 2);

INSERT INTO datasets
  (title, datapoints, owner_id, team_id)
VALUES
  ('Employees', '[{"Employee":"Alfred Smith","Salary":"45000"},{"Employee":"Bob Franklin","Salary":"65000"},{"Employee":"Rachel Jones","Salary":"63000"},{"Employee":"Samantha Daggerton","Salary":"70000"},{"Employee":"Ian Jenkins","Salary":"65000"},{"Employee":"Webster McClaren","Salary":"58000"},{"Employee":"Jay Robertson","Salary":"61000"},{"Employee":"Hilary Newman","Salary":"68000"},{"Employee":"Ruby Williams","Salary":"90000"},{"Employee":"Joseph Wright","Salary":"54000"},{"Employee":"Thomas Phillips","Salary":"20000"}]', 12, 3);

INSERT INTO datasets
  (title, datapoints, owner_id, team_id)
VALUES
  ('Managers', '[{"Research Field":"Agriculture","Team Lead":"Ruby"},{"Research Field":"FinTech","Team Lead":"Samantha"},{"Research Field":"Retail","Team Lead":"Hilary"},{"Research Field":"Healthcare","Team Lead":"Bob"}]', 12, 3);

INSERT INTO notes (dataset_id, owner_id, body) VALUES (1, 12, 'Love this chart!');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (1, 1, 'Soybeans rock!');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (2, 3, 'Nice chart!');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (2, 4, 'Bitcoin prices are directly related to increase in soybean sales.');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (3, 7, 'I want a raise!');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (3, 10, 'Another fantastic chart.');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (4, 11, 'My name is Thomas.');
INSERT INTO notes (dataset_id, owner_id, body) VALUES (4, 12, 'You should all work harder!');


INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (1, 3, 1);
INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (1, 3, 1);
INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (2, 4, 2);
INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (2, 4, 2);
INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (12, 2, 3);
INSERT INTO notifications (sender_id, receiver_id, dataset_id) VALUES (12, 4, 3);