import React from 'react';
import { NavLink } from 'react-router-dom';


const SignedOutLink = (props) => {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                <NavLink to='/' activeClassName='active'>About</NavLink>
            </li>
            <li>
                <NavLink to='/timeline' activeClassName='active'>TimeLine</NavLink>
            </li>
            <li>
                <NavLink to='/portfolio' activeClassName='active'>Portfolio</NavLink>
            </li>
            <li>
                <NavLink to='/contact' activeClassName='active'>Contact</NavLink>
            </li>
            <li>
                <NavLink to='/signup' className='active'>SignUp</NavLink>
            </li>
            <li>
                <NavLink to='/signin' activeClassName='active'>LogIn</NavLink>
            </li>
        </ul>
    );
};

export default SignedOutLink;