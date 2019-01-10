import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';

const navigation = ({navs=[
    {to:"/",activeName:"active",name:"About"}
    ,
    {to:"/timeline",activeName:"active",name:"TimeLine"}
]}) => {
    const navList = navs.map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    return (
        <div className="nav-body">
            <ul className="menu">
                {navList}
            </ul>
        </div>
    );
};

export default navigation;