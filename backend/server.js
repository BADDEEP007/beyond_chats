import express from 'express';
import cors from 'cors';
import { Scrape_url } from './scraper.js';
import { saveArticle, getAllArticles, getArticleById, updateArticle, deleteArticle } from './database.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Scrape endpoint
app.post('/api/scrape', Scrape_url);

// CRUD endpoints
app.post('/api/articles', saveArticle);
app.get('/api/articles', getAllArticles);
app.get('/api/articles/:id', getArticleById);
app.put('/api/articles/:id', updateArticle);
app.delete('/api/articles/:id', deleteArticle);

app.listen(PORT, () => {
    console.log(`Server is Running on ${PORT}`);
});
