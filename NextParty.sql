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
  `role_id` int NULL DEFAULT '1',
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

Alter table items add constraint `item_category` foreign key (`category_id`) references `categories` (`id`);
Alter table items add constraint `wishlist_item` foreign key (`party_id`) references `wishlists` (`id`);
Alter table user_item add constraint `item_user` foreign key (`item_id`) references `items` (`id`);
Alter table user_item add constraint `user_item` foreign key (`user_id`) references `users` (`id`);
Alter table user_party add constraint `party_user` foreign key (`party_id`) references `parties` (`id`);
Alter table user_party add constraint `user_party` foreign key (`user_id`) references `users` (`id`);
-- Alter table user_party add constraint `user_role` foreign key (`role_id`) references  `roles` (`id`);
Alter table wishlists add constraint `wishlist_party` foreign key (`party_id`) references `parties` (`id`);
