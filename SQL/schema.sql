CREATE DATABASE chat;

USE chat;
/* Create other tables and define schemas for them here! */
CREATE TABLE users (
  UserID int NOT NULL AUTO_INCREMENT,
  UserName varchar(20),
  PRIMARY KEY(UserID)
);

CREATE TABLE messages (
  /* Describe your table here.*/
  MessageID int NOT NULL AUTO_INCREMENT,
  UserID int NOT NULL,
  Message varchar(140),
  CreatedAt timestamp,
  RoomName varchar(20),
  PRIMARY KEY(MessageID),
  FOREIGN KEY(UserID)
    REFERENCES users(UserID)
);


CREATE TABLE friends (
  RelationshipID int NOT NULL AUTO_INCREMENT,
  FirstUserID int,
  FriendUserID int,
  PRIMARY KEY(RelationshipID),
  FOREIGN KEY(FirstUserID)
    REFERENCES users(UserID),
  FOREIGN KEY(FriendUserID)
    REFERENCES users(UserID)
);



/*  Execute this file from the command line by typing:
 *    mysql < schema.sql
 *  to create the database and the tables.*/




