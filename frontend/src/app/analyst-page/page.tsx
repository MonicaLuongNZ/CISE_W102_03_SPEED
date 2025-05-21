'use client'

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export type Article = {
  _id: string;
  title: string;
  authors: string;
  journal_name: string;
  published_year: string;
};

type AnalysisFormData = {
  evidenceType: string;
  source: string;
  summary: string;
  tags: string;
};

export default function AnalystPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { register, handleSubmit, reset, setValue } = useForm<AnalysisFormData>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/status/approved`)
      .then((res) => res.json())
      .then((data) => setArticles(data));

    const today = new Date().toISOString().split('T')[0];
    setValue('source', 'Internal');
  }, [setValue]);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    reset({ source: 'Internal' });
  };

  const onSubmit = async (data: AnalysisFormData) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/${selectedId}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, tags: data.tags.split(',').map((tag) => tag.trim()), analyzedBy: 'analyst123' }),
    });

    if (res.ok) {
      alert('Analysis submitted!');
      setArticles(articles.filter((a) => a._id !== selectedId));
      setSelectedId(null);
    } else {
      alert('Failed to submit analysis');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Articles Awaiting Analysis</h2>

      {articles.length === 0 ? (
        <p>No articles to analyze.</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Authors</th>
              <th>Journal</th>
              <th>Published</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article._id}>
                <td>{article.title}</td>
                <td>{article.authors}</td>
                <td>{article.journal_name}</td>
               <td>{article.published_year}</td>
                <td>
                  <button className="btn btn-outline-primary btn-sm" onClick={() => handleSelect(article._id)}>
                    Analyze
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedId && (
        <div className="card mt-5">
          <div className="card-body">
            <h4 className="card-title">Analysis Form</h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label className="form-label">Evidence Type</label>
                <select {...register('evidenceType')} className="form-select" required>
                  <option value="">Select</option>
                  <option value="Interview">Interview</option>
                  <option value="Observation">Observation</option>
                  <option value="Survey">Survey</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Source</label>
                <select {...register('source')} className="form-select" required>
                  <option value="">Select</option>
                  <option value="Internal">Internal</option>
                  <option value="Third Party">Third Party</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Summary</label>
                <textarea {...register('summary')} className="form-control" rows={3} required />
              </div>

              <div className="mb-3">
                <label className="form-label">Tags (comma-separated)</label>
                <input {...register('tags')} className="form-control" />
              </div>

              <button type="submit" className="btn btn-success me-2">Submit</button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedId(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
