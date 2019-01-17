import React from 'react';
import { NavLink,Link } from 'react-router-dom';

const Header = ({signOutNavs, signInNavs}) => {
    const navList = signOutNavs.map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    // signIn signOut 에 따라 다르게 보여줘야된다.
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