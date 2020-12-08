create database ecommercedb2;

use ecommercedb2;

create table user (
id int auto_increment,
email varchar(255),
password varchar(255),
role varchar(255),
picture varchar(255),
primary key(id)
);

INSERT INTO `ecommercedb2`.`user` (`email`, `password`, `role`,`picture`) VALUES ('admin@gmail.com', 'adminPass', 'admin', 'defaultProfilePic.jpg');

create table product (
    pid int auto_increment,
    product_name varchar(255),
    description varchar(255),
    price float,
    picture varchar(255),
    primary key(pid)
);

create table cart(
	cid int auto_increment,
    id int, 
    pid int, 
	product_name varchar(255),
	price float,
	picture varchar(255),
    primary key(cid)
);
