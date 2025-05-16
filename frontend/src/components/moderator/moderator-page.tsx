import { useEffect, useState } from 'react';
import Header from '../header';
import { Article } from "../article";

// ModeratorPage component: displays a queue of pending articles for review
export default function ModeratorPage() {
  // State: list of articles, loading indicator, and error message
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  // Base URL for backend API; hardcoded here for simplicity
  //const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/$/, '');

  // Fetch pending articles when the component mounts
  useEffect(() => {
    fetch(`http://localhost:5000/api/articles/pending`, { credentials: 'include' })
      .then(async res => {
        // Check HTTP status
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // Validate JSON response
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error('Invalid response');
        return res.json();
      })
      .then(data => {
        // Ensure the response is an array before setting state
        if (Array.isArray(data)) setArticles(data);
        else throw new Error('Expected an array');
      })
      .catch(err => {
        // Handle fetch or parsing errors
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false)); // Turn off loading
  }, []);

  // updateStatus: called when Approve/Reject buttons are clicked
  const updateStatus = async (id: string, action: 'approve'|'reject') => {
    try {
      // Send PATCH request to update article status
      const res = await fetch(`http://localhost:5000/api/articles/${action}/${id}`, {
        method: 'PATCH',
        credentials: 'include',
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed (${res.status}): ${text}`);
      }
      // On success, remove the article from the list
      setArticles(a => a.filter(x => x._id !== id));
    } catch (err: any) {
      // Alert user on failure
      alert(`Error: ${err.message}`);
    }
  };

  // Display loading state
  if (loading) return <p className="p-4">Loading…</p>;
  // Display error state
  if (error)   return <p className="p-4 text-danger">Error: {error}</p>;

  return (
    <div className="container-fluid">
      <Header title="SPEED" role="Moderator User" />
      <h2 className="mt-4">Articles Pending Review</h2>

      {articles.length === 0
        ? <p>No articles awaiting moderation.</p>
        : (
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
                <td>{article.published_year}</td>
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
