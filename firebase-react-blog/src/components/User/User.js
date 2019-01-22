import React from 'react';
import { Redirect } from 'react-router-dom';

const User = (props) => {
    const { user } = props;
    if(!user) return <Redirect to='/'/>
    return (
        <div>
            <div>
                {console.log(user)}
                <h1>welcome {user.displayName}</h1>
                <h2>email : {user.email}</h2>
                <img alt="profile picture" src={user.photoURL}/>
          </div>
        </div>
    );
};

export default User;