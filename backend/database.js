import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { eq } from "drizzle-orm";
import { articles } from "./schema.js";

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:npg_GrCknyZ6q1xQ@ep-polished-pond-ahe25o12-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    ssl: { rejectUnauthorized: false }
});

export const db = drizzle(pool);

// Save only top 5 articles
export async function saveArticle(req, res) {
    try {
        const scraped = req.body.scraped_data;
        const top5 = scraped.slice(0, 5);
        
        await db.insert(articles).values(top5.map(a => ({
            title: a.title,
            link: a.link,
            author: a.author,
            posted_at: a.date
        })));

        res.status(200).json({ mssg: 'Successfully saved top 5 articles' });
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Get all articles
export async function getAllArticles(req, res) {
    try {
        const allArticles = await db.select().from(articles);
        res.status(200).json({ data: allArticles });
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Get single article by ID
export async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        const article = await db.select().from(articles).where(eq(articles.id, parseInt(id)));
        if (article.length === 0) {
            return res.status(404).json({ error: 'Article not found' });
        }
        res.status(200).json({ data: article[0] });
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Update article
export async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const { title, link, author, posted_at } = req.body;
        
        await db.update(articles)
            .set({ title, link, author, posted_at })
            .where(eq(articles.id, parseInt(id)));
        
        res.status(200).json({ mssg: 'Article updated successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
}

// Delete article
export async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        await db.delete(articles).where(eq(articles.id, parseInt(id)));
        res.status(200).json({ mssg: 'Article deleted successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
}
