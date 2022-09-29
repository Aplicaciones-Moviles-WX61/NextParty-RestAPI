CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `quantity` int NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `parties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(200) NOT NULL,
  `location` varchar(100) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_item` (
  `user_id` int NOT NULL,
  `item_id` int NOT NULL,
  `obtained_on` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user_party` (
  `user_id` int NOT NULL,
  `party_id` int NOT NULL,
  `role_Id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`,`party_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `lastname` varchar(60) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(9) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `wishlists` (
  `id` int NOT NULL AUTO_INCREMENT,
  `party_id` int NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

Alter table items add CONSTRAINT `Items_Category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
Alter table items add CONSTRAINT `Items_Wishlists` FOREIGN KEY (`party_id`) REFERENCES `wishlists` (`id`);
Alter table user_item add CONSTRAINT `User_Item_Items` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`);
Alter table user_item add CONSTRAINT `User_Item_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
Alter table user_party add CONSTRAINT `user_party_Parties` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`);
Alter table user_party add CONSTRAINT `user_party_Users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
ALTER TABLE user_party ADD CONSTRAINT `user_party_role` FOREIGN KEY User_Party_Role (`role_id`) REFERENCES Roles (id);
Alter table wishlists add CONSTRAINT `Wishlists_Parties` FOREIGN KEY (`party_id`) REFERENCES `parties` (`id`) ;

