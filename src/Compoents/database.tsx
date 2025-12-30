import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { Blogs_data } from "./scraper";



const pool = new Pool({
    connectionString:'postgresql://neondb_owner:npg_GrCknyZ6q1xQ@ep-weathered-thunder-ah1h0yw0-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
    ,
    ssl:{rejectUnauthorized : false}
});



export const saveArticle=async(scraped:Blogs_data[])=>{
    for (const article of scraped){
        await db.insert(articles).values({
            title:article.title,
            link:article.link,
            author:article.author,
            posted_at:article.date
        })
    }
}


export const db = drizzle(pool);