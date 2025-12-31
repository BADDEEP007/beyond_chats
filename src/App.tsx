import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './Pages/Home';
import { ArticlesPage } from './Pages/Articles';

function App() {
  return (
    <BrowserRouter>
      <nav style={navStyle}>
        <Link to="/" style={navLinkStyle}>Home</Link>
        <Link to="/articles" style={navLinkStyle}>Articles</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/articles" element={<ArticlesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

const navStyle: React.CSSProperties = {
  background: '#fff',
  padding: '16px 30px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  display: 'flex',
  gap: '24px'
};

const navLinkStyle: React.CSSProperties = {
  color: '#3498db',
  textDecoration: 'none',
  fontWeight: 500,
  fontSize: '1rem'
};

export default App;
