create database project2_dev;
USE project2_dev;
CREATE TABLE Users
(
    id int NOT NULL AUTO_INCREMENT,
	firstName varchar(127) NOT NULL,
    lastName varchar(127) NOT NULL,
    email varchar(127) NOT NULL,
    password varchar(127) NOT NULL,
    isAdmin BOOLEAN DEFAULT(FALSE), 
    pet varchar(127) NOT NULL,
    petAge integer(20) not null,
    petName varchar(127) NOT NULL,
    address varchar(255),
    city varchar(255),
    state varchar(255),
    zipcode char(5),
    PRIMARY KEY(id)
);
