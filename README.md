# Blog Scraper

A full-stack web application that scrapes blog articles and stores them in a PostgreSQL database with full CRUD functionality.

## Tech Stack

**Frontend:**
- React 19 + TypeScript
- Vite
- React Router DOM
- Axios

**Backend:**
- Node.js + Express
- Drizzle ORM
- PostgreSQL (Neon)
- Cheerio (web scraping)

## Features

- Scrape blog articles from any URL
- Save top 5 articles to database
- View all saved articles in a responsive card layout
- Edit article details inline
- Delete articles
- Professional, light-colored UI

## Project Structure

```
├── backend/
│   ├── server.js        # Express server & routes
│   ├── scraper.js       # Web scraping logic
│   ├── database.js      # CRUD operations
│   ├── schema.js        # Drizzle schema
│   └── package.json
├── src/
│   ├── Pages/
│   │   ├── Home.tsx     # Scraper & CRUD interface
│   │   └── Articles.tsx # Articles display page
│   ├── App.tsx          # Router setup
│   └── main.tsx         # Entry point
├── .env                 # Environment variables
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/scrape` | Scrape articles from URL |
| GET | `/api/articles` | Get all articles |
| GET | `/api/articles/:id` | Get single article |
| POST | `/api/articles` | Save top 5 articles |
| PUT | `/api/articles/:id` | Update article |
| DELETE | `/api/articles/:id` | Delete article |

## Setup

1. Install dependencies:
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

2. Configure environment variables in `.env`:
```
VITE_BACKEND_URL=http://localhost:5000
```

3. Run the application:
```bash
# Backend (in backend folder)
npm run dev

# Frontend (in root folder)
npm run dev
```

4. Open http://localhost:5173 in your browser

## Usage

1. **Home Page**: Enter a blog URL and click "Scrape & Save Top 5" to fetch and store articles
2. **Articles Page**: View all saved articles in a responsive card grid
3. Use Edit/Delete buttons to manage articles
