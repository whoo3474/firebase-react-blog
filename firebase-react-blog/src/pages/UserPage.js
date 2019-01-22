import React, { Component } from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import UserWrapper from '../containers/UserWrapper/UserWrapper';

class UserPage extends Component {
    render() {
        return (
            <PageTemplate>
                <UserWrapper/>
            </PageTemplate>
        );
    }
}

export default UserPage;