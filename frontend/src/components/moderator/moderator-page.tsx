'use client';

import { useEffect, useState } from 'react';
import Header from '../header';
import { Article } from "../article";

export default function ModeratorPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BACKEND}/api/articles/status/pending`, { credentials: 'include' })
      .then(async res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error('Invalid response');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setArticles(data);
        else throw new Error('Expected an array');
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const updateStatus = async (id: string, action: 'approve' | 'reject') => {
    try {
      const res = await fetch(`${BACKEND}/api/articles/${action}/${id}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed (${res.status}): ${text}`);
      }
      setArticles(a => a.filter(x => x._id !== id));
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  if (loading) return <p className="p-4">Loading…</p>;
  if (error) return <p className="p-4 text-danger">Error: {error}</p>;

  return (
    <div className="container-fluid">
      <Header title="SPEED" role="Moderator User" />
      <h2 className="mt-4">Articles Pending Review</h2>

      {articles.length === 0 ? (
        <p>No articles awaiting moderation.</p>
      ) : (
        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal</th>
              <th>Year</th>
              <th>DOI</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors}</td>
                <td>{article.journal_name}</td>
                <td>{typeof article.published_year === 'number' ? article.published_year : ''}</td>
                <td>{article.doi}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-success me-2"
                    onClick={() => updateStatus(article._id!, 'approve')}
                  >
                    Approve
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => updateStatus(article._id!, 'reject')}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
