set transaction read write;

CREATE EXTENSION "uuid-ossp";

CREATE OR REPLACE FUNCTION TRIGGER_SET_TIMESTAMP() 
RETURNS TRIGGER AS $$ 
	BEGIN NEW."updatedAt" = NOW();
	RETURN NEW;
	END $$ LANGUAGE 
PLPGSQL; 

CREATE TABLE
    "users" (
        "id" VARCHAR(255) default uuid_generate_v4(),
        "email" VARCHAR(255),
        "password" VARCHAR(255),
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "users" add primary key ("id");

CREATE TABLE
    "profile"(
        "id" VARCHAR(255) default uuid_generate_v4(),
        "userId" VARCHAR(255),
        "fullName" VARCHAR(255),
        "picture" VARCHAR(255),
        "birthDate" VARCHAR(255),
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "profile" add primary key ("id");


CREATE TABLE
    "forgot_passwords"(
        "id" VARCHAR(255) default uuid_generate_v4(),
        "code" VARCHAR(25),
        "userId" VARCHAR(255),
        "email" VARCHAR(255),
        "available" BOOLEAN DEFAULT true,
        "createdAt" TIMESTAMPTZ default now(),
        "updatedAt" TIMESTAMPTZ
    );

alter table "forgot_passwords" add primary key ("id");

CREATE TRIGGER SET_TIMESTAMP 
	before
	update
	    on "forgot_passwords" for each row
	execute
	    procedure trigger_set_timestamp();


CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "users" for each row
	execute
	    procedure trigger_set_timestamp();


CREATE TRIGGER SET_TIMESTAMP 
	before
	update on "profile" for each row
	execute
	    procedure trigger_set_timestamp();

