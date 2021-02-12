CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    name        varchar(50),
    email       varchar(50),
    password    text not null,
    primary key (email)
);

CREATE TABLE profs (
    id          serial unique,
    fa_name     varchar(50),
    en_name     varchar(50),
    image_path  varchar(60),
    uni         varchar(50),
    primary key (en_name, uni)
);

CREATE TABLE comments (
    id          serial,
    user_email  varchar(50),
    prof_id     serial,
    comment     text,
    confirmed   boolean default false,
    created_at  varchar(10),
    primary key (user_email, prof_id),
    foreign key (user_email) references users (email) on delete cascade,
    foreign key (prof_id) references profs (id) on delete cascade
);

CREATE TABLE admins (
    username    varchar(30),
    password    text,
    primary key (username)
);

CREATE TABLE requests (
    name    varchar(50),
    uni     varchar(50),
    description     text
);