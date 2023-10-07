CREATE TABLE `states` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`abbrev` text,
	`country_id` integer,
	FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE countries ADD `long_name` text;--> statement-breakpoint
CREATE UNIQUE INDEX `state_country_name_idx` ON `states` (`country_id`,`name`);