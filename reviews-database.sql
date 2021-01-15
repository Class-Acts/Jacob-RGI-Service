CREATE DATABASE IF NOT EXISTS reviews;
USE reviews;

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (

  id smallint not null auto_increment, name varchar(20) not null, number_reviews tinyint not null, typical_size varchar(20) not null, height varchar(10) not null, weight varchar(10) not null, age tinyint not null, location varchar(30) not null, primary key (id)

  );

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE reviews (

  id smallint not null auto_increment, shoe_id tinyint not null, user_id smallint not null references users(id), review_date date not null, title varchar(40) not null, body varchar(1000) not null, stars tinyint not null, fit tinyint not null, width tinyint not null, helpful tinyint not null, reccomended tinyint(1) not null, primary key (id)

  );