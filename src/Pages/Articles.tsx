import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_BACKEND_URL;

interface Article {
  id: number;
  title: string;
  link: string;
  author: string;
  posted_at: string;
  createdAt: string;
}

export const ArticlesPage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/api/articles`);
      setArticles(res.data.data || []);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Articles</h1>
        <p style={subtitleStyle}>Browse all scraped blog articles</p>
      </header>

      {loading ? (
        <div style={loadingStyle}>Loading articles...</div>
      ) : articles.length === 0 ? (
        <div style={emptyStyle}>No articles found. Go to Home to scrape some blogs!</div>
      ) : (
        <div style={gridStyle}>
          {articles.map((article) => (
            <div key={article.id} style={cardStyle}>
              <div style={cardHeaderStyle}>
                <span style={idBadgeStyle}>#{article.id}</span>
                <span style={dateStyle}>{article.posted_at || 'No date'}</span>
              </div>
              <h3 style={cardTitleStyle}>
                <a href={article.link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                  {article.title || 'Untitled'}
                </a>
              </h3>
              <div style={authorStyle}>
                <span style={authorLabelStyle}>By:</span> {article.author || 'Unknown'}
              </div>
              <div style={metaStyle}>
                <span style={metaLabelStyle}>Saved:</span> {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'N/A'}
              </div>
              <a href={article.link} target="_blank" rel="noopener noreferrer" style={readMoreStyle}>
                Read Article →
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%)',
  padding: '40px 20px'
};

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  marginBottom: '40px'
};

const titleStyle: React.CSSProperties = {
  fontSize: '2.5rem',
  color: '#2c3e50',
  margin: 0,
  fontWeight: 600
};

const subtitleStyle: React.CSSProperties = {
  color: '#7f8c8d',
  fontSize: '1.1rem',
  marginTop: '8px'
};

const loadingStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '60px',
  color: '#7f8c8d',
  fontSize: '1.2rem'
};

const emptyStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '60px',
  color: '#95a5a6',
  fontSize: '1.1rem',
  background: '#fff',
  borderRadius: '12px',
  maxWidth: '500px',
  margin: '0 auto'
};

const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
  gap: '24px',
  maxWidth: '1200px',
  margin: '0 auto'
};

const cardStyle: React.CSSProperties = {
  background: '#fff',
  borderRadius: '12px',
  padding: '24px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  transition: 'transform 0.2s, box-shadow 0.2s',
  display: 'flex',
  flexDirection: 'column'
};

const cardHeaderStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px'
};

const idBadgeStyle: React.CSSProperties = {
  background: '#e8f4f8',
  color: '#3498db',
  padding: '4px 10px',
  borderRadius: '20px',
  fontSize: '0.85rem',
  fontWeight: 500
};

const dateStyle: React.CSSProperties = {
  color: '#95a5a6',
  fontSize: '0.85rem'
};

const cardTitleStyle: React.CSSProperties = {
  margin: '0 0 12px 0',
  fontSize: '1.15rem',
  lineHeight: 1.4
};

const linkStyle: React.CSSProperties = {
  color: '#2c3e50',
  textDecoration: 'none'
};

const authorStyle: React.CSSProperties = {
  color: '#7f8c8d',
  fontSize: '0.95rem',
  marginBottom: '8px'
};

const authorLabelStyle: React.CSSProperties = {
  color: '#95a5a6'
};

const metaStyle: React.CSSProperties = {
  color: '#bdc3c7',
  fontSize: '0.85rem',
  marginBottom: '16px'
};

const metaLabelStyle: React.CSSProperties = {
  color: '#95a5a6'
};

const readMoreStyle: React.CSSProperties = {
  marginTop: 'auto',
  color: '#3498db',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '0.95rem'
};
