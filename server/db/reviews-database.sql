CREATE DATABASE IF NOT EXISTS reviews;
USE reviews;

DROP TABLE IF EXISTS `users`;
CREATE TABLE users (

  id smallint not null auto_increment,
  name varchar(40) not null,
  number_reviews tinyint not null,
  typical_size varchar(20) not null,
  height varchar(20) not null,
  weight varchar(30) not null,
  age varchar(30),
  location varchar(50) not null,
  primary key (id)

  );

DROP TABLE IF EXISTS `reviews`;
CREATE TABLE reviews (

  id smallint not null auto_increment,
  shoe_id smallint not null,
  user_id smallint not null references users(id),
  review_date date not null,
  title varchar(200) not null,
  body varchar(4000) not null,
  stars tinyint not null,
  fit tinyint not null,
  width tinyint not null,
  helpful tinyint not null,
  recommended tinyint(1) not null,
  not_recommended tinyint(1) not null,
  primary key (id)
  );