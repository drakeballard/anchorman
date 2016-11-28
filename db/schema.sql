### Schema

CREATE DATABASE anchorman_db;
USE anchorman_db;

CREATE TABLE articles
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(255) NOT NULL,
    odate varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    url varchar(255) NOT NULL,
	story varchar(255) NOT NULL,
    yesno BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);

