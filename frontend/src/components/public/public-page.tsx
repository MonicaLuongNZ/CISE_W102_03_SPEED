'use client';

import { useRouter } from 'next/navigation';
import Header from '../header';
import { useEffect, useState } from 'react';
import { set } from 'react-hook-form';

// Article type definition
type Article = {
    _id: string;
    title: string;
    authors: string;
    journal_name: string;
    published_year: number;
    doi: string;
    se_practice: string;
    claim: string;
    result_of_evidence: string;
    type_of_research: string;
    type_of_participant: string;
};

function PublicPage() {
    const router = useRouter();

    // State variables for articles, filtered articles, search panel, SE method, sorting field, and sort order
    const [articles, setArticles] = useState<Article[]>([]);
    const [articlesFiltered, setArticlesFiltered] = useState<Article[]>([]);
    const [showSearchPanel, setShowSearchPanel] = useState(false);
    const [seMethod, setSEMethod] = useState('');
    const [sortBy, setSortBy] = useState('title');
    const [sortOrderAsc, setSortOrderAsc] = useState<boolean>(true);

    // Fetch articles from backend on component mount
    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/articles/status/analysed`)
            .then(res => res.json())
            .then(data => {
                // Sort articles by title initially
                data.sort((a: Article, b: Article) => a.title.localeCompare(b.title));
                setArticles(data);
                setArticlesFiltered(data);
            });
    }, []);
    
    // Navigate to submit article page
    const handleSubmitArticleClick = () => {
        router.push('/public-page/submit-article-page');
    };

    // Show the search panel
    const handleSearchEvidenceClick = () => {
        setShowSearchPanel(true);
    };

    // Update selected SE method
    const handleSEMethodSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSEMethod(event.target.value);
    }

    // Filter articles by selected SE method
    const handleSearchSEMethod = () => {
        if (seMethod === '') {
            setArticlesFiltered(articles);
        } else {
            const filteredArticles = articles.filter(article => 
                article.se_practice && article.se_practice.toLowerCase() === seMethod.toLowerCase()
            );
            setArticlesFiltered(filteredArticles);
        }
    };

    // Change sorting field and sort articles
    const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortBy = event.target.value;
        setSortBy(sortBy);
        sortArticles(sortBy, sortOrderAsc);
    };

    // Change sorting order and sort articles
    const handleSortOrderButtonClick = (ascending: boolean) => {
        setSortOrderAsc(ascending);
        sortArticles(sortBy, ascending);
    };

    // Sort articles by selected field and order
    const sortArticles = (sortBy: string, ascending: boolean) => {
        console.log(`Sorting by: ${sortBy}, Order: ${ascending ? 'Ascending' : 'Descending'}`);

        const sortedArticles = [...articlesFiltered].sort((a: any, b: any) => {
            if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
                return ascending
                    ? a[sortBy].localeCompare(b[sortBy])
                    : b[sortBy].localeCompare(a[sortBy]);
            } else {
                return ascending
                    ? (a[sortBy] > b[sortBy] ? 1 : -1)
                    : (a[sortBy] < b[sortBy] ? 1 : -1);
            }
        });
        
        setArticlesFiltered(sortedArticles);
    }

    return (
        <div className="container-fluid">
            {/* Header component */}
            <Header title="SPEED" role="Public User" />
            <div className="row">
                {/* Sidebar with submit and search buttons */}
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
                            
                            {/* Search panel for SE method */}
                            { showSearchPanel && (
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <div className="mb-3">
                                            <h5 className="form-label font-weight-bold">Select SE method</h5>
                                            <select className="form-select" name="se_method" defaultValue={""} onChange={handleSEMethodSelectChange}>
                                                <option value="Test-Driven Development">Test-Driven Development</option>
                                                <option value="Pair Programming">Pair Programming</option>
                                                <option value="CI/CD">CI/CD</option>
                                                <option value="Agile">Agile</option>
                                                <option value="DevOps">DevOps</option>
                                                <option value="Other">Other</option>
                                                <option value="">All</option>
                                            </select>
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={handleSearchSEMethod}>Search</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Vertical divider */}
                <div className="col-1" style={{width: '1px'}}>
                    <div className="vr" style={{minHeight: '100vh'}}></div>
                </div>
                {/* Main content: sorting and articles table */}
                <div className="col-8">
                    <div className='text-center fw-bold fs-2 py-4'>
                        Software Practice Empirical Evidence Database TEST
                    </div>
                    <div className='text-center fs-5 py-2'>
                        <table>
                            <tbody>
                                <tr>
                                    <td className="p-2">Sort by:</td>
                                    <td className="p-2">
                                        {/* Sorting field select */}
                                        <select className="form-select" name="sort_by" defaultValue={""} onChange={handleSortByChange}>
                                            <option value="title">Title</option>
                                            <option value="authors">Author</option>
                                            <option value="journal_name">Journal Name</option>
                                            <option value="published_year">Year of Publication</option>
                                            <option value="se_practice">SE Practice</option>
                                            <option value="claim">Claim</option>
                                            <option value="result_of_evidence">Result of Evidence</option>
                                            <option value="type_of_research">Type of Research</option>
                                            <option value="type_of_participant">Type of Participant</option>
                                        </select>
                                    </td>
                                    {/* Sorting order buttons */}
                                    <td className="p-2">
                                        <button className={`btn ${sortOrderAsc ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleSortOrderButtonClick(true)}>Ascending</button>
                                    </td>
                                    <td className="p-2">
                                        <button className={`btn ${!sortOrderAsc ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => handleSortOrderButtonClick(false)}>Descending</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {/* Articles table */}
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>Article Title</th>
                                <th>Author</th>
                                <th>Journal Name</th>
                                <th>Year of Publication</th>
                                <th>DOI</th>
                                <th>SE practice</th>
                                <th>Claim</th>
                                <th>Result of Evidence</th>
                                <th>Type of Research</th>
                                <th>Type of Participant</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Show message if no articles found */}
                            {articlesFiltered.length === 0 ? (
                                <tr>
                                    <td colSpan={10} className="text-center">No articles found.</td>
                                </tr>
                            ) : (
                                // Render each article row
                                articlesFiltered.map((article: Article) => (
                                    <tr key={article._id}>
                                        <td>{article.title}</td>
                                        <td>{article.authors}</td>
                                        <td>{article.journal_name}</td>
                                        <td>{article.published_year}</td>
                                        <td>{article.doi}</td>
                                        <td>{article.se_practice}</td>
                                        <td>{article.claim}</td>
                                        <td>{article.result_of_evidence}</td>
                                        <td>{article.type_of_research}</td>
                                        <td>{article.type_of_participant}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      );
}
export default PublicPage;