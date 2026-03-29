CREATE TABLE `visitorProfiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`visitorId` varchar(255) NOT NULL,
	`name` text,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`company` text,
	`jobTitle` text,
	`interestType` varchar(100),
	`message` text,
	`consentToContact` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `visitorProfiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `visitorProfiles_visitorId_unique` UNIQUE(`visitorId`)
);
