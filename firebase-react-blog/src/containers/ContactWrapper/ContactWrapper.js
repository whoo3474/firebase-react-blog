import React, { Component } from 'react';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';

class ContactWrapper extends Component {
    render() {
        return (
            <div className="dashboard container">
                <div className="col">
                    <div className="col s12 m5 offset-m1">
                        <Notifications/>
                    </div>
                    <div className="col s12 m6">
                        <ContactList/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ContactWrapper;