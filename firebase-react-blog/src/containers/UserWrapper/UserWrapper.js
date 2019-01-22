import React, { Component } from 'react';
import User from '../../components/User/User';
import { connect } from 'react-redux';

class UserWrapper extends Component {
    render() {
        const {user} = this.props;
        return (
            <div>
                <User user={user}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.auth.user
    }
}
export default connect(mapStateToProps)(UserWrapper);