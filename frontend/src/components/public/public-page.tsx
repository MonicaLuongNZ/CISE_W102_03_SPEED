'use client';

import { useRouter } from 'next/navigation';
import Header from '../header';
function PublicPage() {
    const router = useRouter();
    
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
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
      );
}
export default PublicPage;