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
    feature_1   decimal(3,2) check ( feature_1 >= 0 AND feature_1 <= 5 ),
    feature_2   decimal(3,2) check ( feature_2 >= 0 AND feature_2 <= 5 ),
    feature_3   decimal(3,2) check ( feature_3 >= 0 AND feature_3 <= 5 ),
    feature_4   decimal(3,2) check ( feature_4 >= 0 AND feature_4 <= 5 ),
    confirmed   boolean default false,
    created_at  varchar(10) default current_date,
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

CREATE TABLE ratings (
    prof_id		serial,
    feature_1	numeric(3,2) default 0,
    feature_2	numeric(3,2) default 0,
    feature_3	numeric(3,2) default 0,
    feature_4	numeric(3,2) default 0,
    primary key (prof_id),
    foreign key (prof_id) references profs (id) on delete cascade
);
