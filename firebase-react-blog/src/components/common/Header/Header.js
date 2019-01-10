import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../navigation/navigation';
import './Header.scss';

const Header = () => {
    return (
        <header className="header">
                <div className="logo">
                    {/* 로고를 넣는다 */}
                    <Link to="/">minhan Blog</Link>
                </div>
                <Navigation/>
        </header>
    );
};

export default Header;