-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-09-15 05:42:40.627

-- tables
-- Table: Categories
CREATE TABLE Categories (
    id int NOT NULL AUTO_INCREMENT,
    category varchar(20) NOT NULL,
    CONSTRAINT Categories_pk PRIMARY KEY (id)
);

-- Table: Items
CREATE TABLE Items (
    id int NOT NULL AUTO_INCREMENT,
    party_id int NOT NULL,
    name varchar(100) NOT NULL,
    description varchar(100) NULL,
    quantity int NOT NULL,
    image varchar(100) NULL,
    category_id int NOT NULL,
    CONSTRAINT Items_pk PRIMARY KEY (id)
);

-- Table: Parties
CREATE TABLE Parties (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(100) NOT NULL,
    description varchar(200) NOT NULL,
    location varchar(100) NULL,
    date datetime NULL,
    image varchar(100) NULL,
    CONSTRAINT Parties_pk PRIMARY KEY (id)
);

-- Table: Roles
CREATE TABLE Roles (
    id int NOT NULL AUTO_INCREMENT,
    role varchar(20) NOT NULL,
    CONSTRAINT Roles_pk PRIMARY KEY (Id)
);

-- Table: User_Item
CREATE TABLE User_Item (
    user_id int ,
    item_id int ,
    obtained_on datetime NOT NULL ON update CURRENT_TIMESTAMP,
    CONSTRAINT User_Item_pk PRIMARY KEY (user_id,item_id)
);

-- Table: User_Party
CREATE TABLE User_Party (
    user_id int ,
    parties_id int,
    role_Id int NOT NULL,
    CONSTRAINT User_Party_pk PRIMARY KEY (user_id,parties_id)
);

-- Table: Users
CREATE TABLE Users (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(60) NOT NULL,
    lastname varchar(60) NOT NULL,
    email varchar(50) NOT NULL,
    password varchar(100) NOT NULL,
    phone varchar(9) NULL,
    birthday date NULL,
    CONSTRAINT Users_pk PRIMARY KEY (id)
);

-- Table: Wishlists
CREATE TABLE Wishlists (
    id int NOT NULL AUTO_INCREMENT,
    party_id int NOT NULL,
    description varchar(200) NOT NULL,
    image varchar(200) NULL,
    CONSTRAINT Wishlists_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: Items_Category (table: Items)
ALTER TABLE Items ADD CONSTRAINT Items_Category FOREIGN KEY Items_Category (category_id)
    REFERENCES Categories (id);

-- Reference: Items_Wishlists (table: Items)
ALTER TABLE Items ADD CONSTRAINT Items_Wishlists FOREIGN KEY Items_Wishlists (party_id)
    REFERENCES Wishlists (id);

-- Reference: User_Item_Items (table: User_Item)
ALTER TABLE User_Item ADD CONSTRAINT User_Item_Items FOREIGN KEY User_Item_Items (item_id)
    REFERENCES Items (id);

-- Reference: User_Item_Users (table: User_Item)
ALTER TABLE User_Item ADD CONSTRAINT User_Item_Users FOREIGN KEY User_Item_Users (user_id)
    REFERENCES Users (id);

-- Reference: User_Party_Role (table: User_Party)
ALTER TABLE User_Party ADD CONSTRAINT User_Party_Role FOREIGN KEY User_Party_Role (role_Id)
    REFERENCES Roles (id);

-- Reference: Wishlists_Parties (table: Wishlists)
ALTER TABLE Wishlists ADD CONSTRAINT Wishlists_Parties FOREIGN KEY Wishlists_Parties (party_id)
    REFERENCES Parties (id);

-- Reference: user_party_Parties (table: User_Party)
ALTER TABLE User_Party ADD CONSTRAINT user_party_Parties FOREIGN KEY user_party_Parties (parties_id)
    REFERENCES Parties (id);

-- Reference: user_party_Users (table: User_Party)
ALTER TABLE User_Party ADD CONSTRAINT user_party_Users FOREIGN KEY user_party_Users (user_id)
    REFERENCES Users (id);

-- End of file.

