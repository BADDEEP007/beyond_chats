import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface Article {
  id: number;
  title: string;
  link: string;
  author: string;
  posted_at: string;
}

export const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', link: '', author: '', posted_at: '' });

  const fetchArticles = useCallback(async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/articles`);
      setArticles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const handleScrape = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/scrape`, { url });
      await axios.post(`${apiUrl}/api/articles`, { scraped_data: res.data.data });
      await fetchArticles();
      setUrl('');
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${apiUrl}/api/articles/${id}`);
      await fetchArticles();
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (article: Article) => {
    setEditingId(article.id);
    setEditForm({
      title: article.title,
      link: article.link,
      author: article.author,
      posted_at: article.posted_at
    });
  };

  const handleUpdate = async (id: number) => {
    try {
      await axios.put(`${apiUrl}/api/articles/${id}`, editForm);
      setEditingId(null);
      await fetchArticles();
    } catch (error) {
      console.log(error);
    }
  };

  const btnPrimary = {
    padding: '10px 20px',
    background: '#a8d5ba',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#2d5a3d'
  };

  const btnSecondary = {
    padding: '6px 14px',
    background: '#d4e8ff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#2a5298',
    marginRight: '5px'
  };

  const btnDanger = {
    padding: '6px 14px',
    background: '#ffd4d4',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    color: '#a83232'
  };

  const btnRefresh = {
    padding: '10px 20px',
    background: '#fff3cd',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#856404',
    marginLeft: '10px'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto', background: '#fafafa', minHeight: '100vh' }}>
      <h1 style={{ color: '#444' }}>Blog Scraper</h1>
      
      <form onSubmit={handleScrape} style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Enter blog URL to scrape"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ padding: '10px', width: '400px', marginRight: '10px', borderRadius: '6px', border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={btnPrimary}>
          {loading ? 'Scraping...' : 'Scrape & Save Top 5'}
        </button>
        <button type="button" onClick={fetchArticles} style={btnRefresh}>
          Refresh List
        </button>
      </form>

      <h2 style={{ color: '#555' }}>Saved Articles ({articles.length})</h2>
      
      {articles.length === 0 ? (
        <p style={{ color: '#777' }}>No articles yet. Scrape a blog to get started!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: '8px', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Author</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id}>
                {editingId === article.id ? (
                  <>
                    <td style={tdStyle}>
                      <input
                        value={editForm.title}
                        onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        value={editForm.author}
                        onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <input
                        value={editForm.posted_at}
                        onChange={(e) => setEditForm({ ...editForm, posted_at: e.target.value })}
                        style={inputStyle}
                      />
                    </td>
                    <td style={tdStyle}>
                      <button onClick={() => handleUpdate(article.id)} style={btnSecondary}>Save</button>
                      <button onClick={() => setEditingId(null)} style={btnDanger}>Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td style={tdStyle}>
                      <a href={article.link} target="_blank" rel="noopener noreferrer" style={{ color: '#4a90d9' }}>
                        {article.title}
                      </a>
                    </td>
                    <td style={tdStyle}>{article.author}</td>
                    <td style={tdStyle}>{article.posted_at}</td>
                    <td style={tdStyle}>
                      <button onClick={() => startEdit(article)} style={btnSecondary}>Edit</button>
                      <button onClick={() => handleDelete(article.id)} style={btnDanger}>Delete</button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const thStyle = { border: '1px solid #e0e0e0', padding: '12px', textAlign: 'left' as const, background: '#e8f4f8', color: '#444' };
const tdStyle = { border: '1px solid #e0e0e0', padding: '10px', color: '#555' };
const inputStyle = { width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ccc' };
