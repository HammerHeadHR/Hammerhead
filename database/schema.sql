DROP DATABASE IF EXISTS hammerhead;

CREATE DATABASE hammerhead;

\c hammerhead;

CREATE TABLE users (
 id SERIAL NOT NULL PRIMARY KEY,
 name VARCHAR(50) NOT NULL,
 password VARCHAR(50) NOT NULL,
 team INTEGER NOT NULL,
 admin BOOLEAN DEFAULT 'False'
);

CREATE TABLE teams (
 id SERIAL NOT NULL PRIMARY KEY,
 name VARCHAR(30) NOT NULL,
 leader INTEGER NOT NULL
);

ALTER TABLE users ADD CONSTRAINT users_team_fkey FOREIGN KEY (team) REFERENCES teams(id);
ALTER TABLE teams ADD CONSTRAINT teams_leader_fkey FOREIGN KEY (leader) REFERENCES users(id);

CREATE TABLE datasets (
 id SERIAL NOT NULL PRIMARY KEY,
 name VARCHAR(50) NOT NULL,
 data JSON NOT NULL
);

CREATE TABLE charts (
 id SERIAL NOT NULL PRIMARY KEY,
 name VARCHAR(50) NOT NULL,
 owner INTEGER NOT NULL,
 team INTEGER NOT NULL,
 time TIMESTAMP DEFAULT NOW()
);

ALTER TABLE charts ADD CONSTRAINT charts_owner_fkey FOREIGN KEY (owner) REFERENCES users(id);
ALTER TABLE charts ADD CONSTRAINT charts_team_fkey FOREIGN KEY (team) REFERENCES teams(id);

CREATE TABLE notes (
 id SERIAL NOT NULL PRIMARY KEY,
 chart INTEGER NOT NULL,
 owner INTEGER NOT NULL,
 body VARCHAR(500) NOT NULL,
 time TIMESTAMP DEFAULT NOW()
);

ALTER TABLE notes ADD CONSTRAINT notes_chart_fkey FOREIGN KEY (chart) REFERENCES charts(id);
ALTER TABLE notes ADD CONSTRAINT notes_owner_fkey FOREIGN KEY (owner) REFERENCES users(id);

CREATE TABLE chart_data (
 id SERIAL NOT NULL PRIMARY KEY,
 chart_id INTEGER NOT NULL,
 dataset_id INTEGER NOT NULL
);

ALTER TABLE chart_data ADD CONSTRAINT chart_data_chart_id_fkey FOREIGN KEY (chart_id) REFERENCES charts(id);
ALTER TABLE chart_data ADD CONSTRAINT chart_data_dataset_id_fkey FOREIGN KEY (dataset_id) REFERENCES datasets(id);
