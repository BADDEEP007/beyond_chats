import { pgTable, serial, text, varchar, timestamp, uuid } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/gel-core";

export const articles = pgTable("articles",{
    id:serial('id').primaryKey(),
    title:text('title').notNull(),
    link:varchar('link',{length:255}),
    author:varchar('author',{length:100}),

    posted_at:integer('posted_at'),
    createdAt:timestamp("created_at").defaultNow(),


})
