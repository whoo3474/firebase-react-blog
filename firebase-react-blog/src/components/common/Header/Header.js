import React from 'react';
import { NavLink,Link } from 'react-router-dom';

const Header = ({navs}) => {
    const navList = navs.map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    return (
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to="/" className="brand-logo">Minhan Blog</Link>
                <ul className="right">
                    {navList}
                </ul>
            </div>
        </nav>
    );
};

export default Header;