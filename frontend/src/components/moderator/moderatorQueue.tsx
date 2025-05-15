import React, { useEffect, useState } from 'react';
import { Article } from '../article'; // Adjust the path if needed

export const ModeratorQueue: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('/api/articles?status=pending');
        if (!response.ok) throw new Error('Failed to fetch articles');
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading articles...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Articles Pending Moderation</h2>
      {articles.length === 0 ? (
        <p>No pending articles.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal</th>
              <th>Year</th>
              <th>DOI</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors}</td>
                <td>{article.journal_name}</td>
                <td>{article.published_year}</td>
                <td>{article.doi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
