CREATE DATABASE PPEL;
USE PPEL;

CREATE TABLE USER (
  	id    		  	char(8)         NOT NULL,
	admin			BOOLEAN			NOT NULL,
  	email    	  	varchar(64) NOT NULL,
  	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  	PRIMARY KEY	(id),
	UNIQUE KEY (email)
);

CREATE TABLE VideoAnswers (
  	id	 char(8)	  			   NOT NULL,
	path      varchar(4096) NOT NULL,
	isPublic BOOLEAN NOT NULL,
  	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	questionID INT NOT NULL,
	FOREIGN KEY (id) REFERENCES USER(id),
	FOREIGN KEY (questionID) REFERENCES VideoQuestions(questionID) 
							 ON DELETE CASCADE /***********implement this**********/
							 ON UPDATE CASCADE
);

CREATE TABLE VideoQuestions (
	questionID INT NOT NULL AUTO_INCREMENT, /*for answers to be able to reference this*/ 
	id char(8),
	path varchar(4096)	NOT NULL,
	isPublic BOOLEAN DEFAULT TRUE NOT NULL,
  	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY(videoId)
	FOREIGN KEY(id) REFERENCES USER(id)
);

CREATE TABLE TextQuestions (
  	id	  char(8)	  			   NOT NULL,
	text       varchar(1000) 	NOT NULL,
	isPublic    BOOLEAN  			NOT NULL,
	ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (id) REFERENCES USER(id)
);
