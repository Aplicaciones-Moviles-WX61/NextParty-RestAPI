CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `quantity` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `parties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `user_item` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `obtained_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`item_id`)
);

CREATE TABLE `user_party` (
  `user_id` int NOT NULL,
  `party_id` int NOT NULL,
  `role_Id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`,`party_id`)
);

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `wishlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

Alter table items add CONSTRAINT `Items_Category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
Alter table items add CONSTRAINT `Items_Wishlists` FOREIGN KEY (`party_id`) REFERENCES `wishlists` (`id`);
Alter table user_item add CONSTRAINT `User_Items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
Alter table user_item add CONSTRAINT `Users_Item` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
Alter table user_party add CONSTRAINT `user_parties` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`);
Alter table user_party add CONSTRAINT `party_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE user_party add CONSTRAINT `user_party_role` FOREIGN KEY (`role_id`) REFERENCES  `roles` (`id`);
Alter table wishlists add CONSTRAINT `wishlists_parties` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`) ;

