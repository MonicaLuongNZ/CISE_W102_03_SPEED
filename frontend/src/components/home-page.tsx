'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from './header';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const router = useRouter();

  const handlePublicUserClick = () => {
    router.push('/public-page');
  };

  const handleModeratorUserClick = () => {
    router.push('/moderator-page');
  };
  const handleAnalystUserClick = () => {
    router.push('/analyst-page');
  };
  const handleAdminUserClick = () => {
    router.push('/admin-page');
  };
    return (
        <div className="container-fluid">
            <Header title="SPEED" />
            <div className="row">
                <div className="col-12 text-center my-4 display-6">
                    Click to sign in as:
                </div>
                <div className="col-12 text-center my-2">
                    <input name="public_role" 
                        className="btn btn-info w-25 text-white" 
                        type="button" 
                        value={"Public User"}
                        onClick={handlePublicUserClick} />
                </div>
                <div className="col-12 text-center my-2">
                    <input name="public_role" 
                        className="btn btn-success w-25 text-white" 
                        type="button" 
                        value={"Moderator"}
                        onClick={handleModeratorUserClick}/>
                </div>
                <div className="col-12 text-center my-2">
                    <input name="public_role" 
                        className="btn btn-warning w-25 text-white" 
                        type="button" 
                        value={"Analyst"}
                        onClick={handleAnalystUserClick} />
                </div>
                <div className="col-12 text-center my-2">
                    <input name="public_role" 
                        className="btn btn-danger w-25 text-white" 
                        type="button" 
                        value={"Administrator"}
                        onClick={handleAdminUserClick} />
                </div>
            </div>
        </div>
      );
}
export default HomePage;