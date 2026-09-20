CREATE TABLE `candidate_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`candidate_name` text NOT NULL,
	`verification_email` text NOT NULL,
	`phone` text,
	`biography` text NOT NULL,
	`occupation` text,
	`community_service` text,
	`website` text,
	`linkedin` text,
	`portrait_url` text,
	`answers` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `community_questions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`question` text NOT NULL,
	`name` text,
	`email` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
