'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../header';
import { Article } from '../article';

function PublicPage() {
    const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading]   = useState(true);
    const [error, setError]       = useState<string | null>(null);
    
    //const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000').replace(/\/$/,'');

    // Fetch pending articles when the component mounts
    useEffect(() => {
    fetch(`http://localhost:5000/api/articles/approved`)
      .then(async (res) => {
        // Check HTTP status
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        // Validate JSON response
        const ct = res.headers.get('content-type') || '';
        if (!ct.includes('application/json')) throw new Error('Invalid response');
        return res.json();
      })
      .then((data) => {
        // Ensure the response is an array before setting state
        if (Array.isArray(data)) setArticles(data);
        else throw new Error('Expected an array');
      })
      .catch((err) => {
        // Handle fetch or parsing errors
        console.error(err);
        setError(err.message);
      })
      .finally(() => setLoading(false)); // Turn off loading
    }, []);

    const handleSubmitArticleClick = () => {
      router.push('/public-page/submit-article-page');
    };
    const handleSearchEvidenceClick = () => {
      router.push('/public-page/submit-article-page');
    };

    return (
        <div className="container-fluid">
            <Header title="SPEED" role="Public User" />
            <div className="row">
                <div className="col-3">
                    <div className="row">
                        <div className="col-12 text-center my-2 mt-4">
                            <input name="public_role" 
                                className="btn btn-warning w-100 text-white" 
                                type="button" 
                                value={"Submit Article"}
                                onClick={handleSubmitArticleClick}/>
                        </div>
                        <div className="col-12 text-center my-2">
                            <input name="public_role" 
                                className="btn btn-success w-100 text-white" 
                                type="button" 
                                value={"Search Evidence"}
                                onClick={handleSearchEvidenceClick}/>
                        </div>
                    </div>
                </div>
                <div className="col-1">
                    <div className="vr" style={{minHeight: '100vh'}}></div>
                </div>
                <div className="col-8">
                    <div className="row">
                        <div className='text-center fw-bold fs-2 py-4'>
                            Software Practice Empirical Evidence Database
                        </div>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Article Title</th>
                                    <th>Author</th>
                                    <th>Journal Name</th>
                                    <th>Year of Publication</th>
                                    <th>DOI</th>
                                    <th>Claim</th>
                                    <th>Evidence</th>
                                </tr>
                            </thead>
                            {loading ? (
                <tbody>
                  <tr>
                    <td colSpan={7}>Loading articles…</td>
                  </tr>
                </tbody>
              ) : error ? (
                <tbody>
                  <tr>
                    <td colSpan={7} className="text-danger">
                      Error: {error}
                    </td>
                  </tr>
                </tbody>
              ) : articles.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan={7}>No approved articles available.</td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {articles.map((a) => (
                    <tr key={a._id!}>
                      <td>{a.title}</td>
                      <td>{a.authors}</td>
                      <td>{a.journal_name}</td>
                      <td>{a.published_year}</td>
                      <td>
                        <a
                          href={`https://doi.org/${a.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {a.doi}
                        </a>
                      </td>
                      <td>{a.claim}</td>
                      <td>{a.evidence}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PublicPage;