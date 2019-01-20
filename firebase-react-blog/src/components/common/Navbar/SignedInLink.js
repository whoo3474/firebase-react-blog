import React from 'react';
import { NavLink } from 'react-router-dom';


const SignedInLink = (props) => {
    return (
        <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
                <NavLink to='/' activeClassName='active'>About</NavLink>
            </li>
            <li>
                <NavLink to='/timeline' activeClassName='active'>TimeLine</NavLink>
            </li>
            <li>
                <NavLink to='/contact' activeClassName='active'>Contact</NavLink>
            </li>
            <li>
                <NavLink to='/user' className='btn btn-floating pink lighten-1'>user</NavLink>
            </li>
            <li>
                <a onClick={()=>props.handleClick()}>LogOut</a>
            </li>
        </ul>
    );
};

export default SignedInLink;