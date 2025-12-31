import { pgTable, serial, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";

export const articles = pgTable("articles", {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    link: varchar('link', { length: 255 }),
    author: varchar('author', { length: 100 }),
    posted_at: varchar('posted_at'),
    createdAt: timestamp("created_at").defaultNow(),
});
