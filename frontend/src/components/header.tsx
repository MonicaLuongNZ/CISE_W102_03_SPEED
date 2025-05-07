import React from 'react';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import Link from 'next/link';

interface HeaderProps {
    title: string;
    role?: string;
  }

const Header = ({ title, role }: HeaderProps) => {
  return (
    <div className="row bg-primary align-items-center">
        <div className="col-8">
            <Link className="text-decoration-none" href ='/'><div className="display-5 text-white p-3"><i className="bi bi-code-slash"></i> {title}</div></Link>
        </div>
        <div className="col-4 display-8 text-white text-end p-3">
            {role}
        </div>
    </div>
  );
};

export default Header;