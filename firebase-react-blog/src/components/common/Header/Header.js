import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo">
                    {/* 로고를 넣는다 */}
                    <Link to="/">minhan Blog</Link>
                </div>
                <div className="right">
                    {/* 메뉴를 넣는다 */}
                    <Link to="/"></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;