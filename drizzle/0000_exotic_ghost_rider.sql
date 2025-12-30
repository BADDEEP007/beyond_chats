CREATE TABLE "articles" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"link" varchar(255),
	"author" varchar(100),
	"posted_at" integer,
	"created_at" timestamp DEFAULT now()
);
