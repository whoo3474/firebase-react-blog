import React, { Component } from 'react';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { connect } from 'react-redux';
import { getContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';

class ContactWrapper extends Component {
    componentWillMount() {
        this.props.getContactTk();
    }
    render() {
        const { contacts } = this.props;
        return (
            <div className="dashboard container">
                <div className="col">
                    <div className="col s12 m5 offset-m1">
                        <Notifications/>
                    </div>
                    <div className="col s12 m6">
                        <ContactList contacts={contacts}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        contacts : state.contact.contacts
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactTk : bindActionCreators(getContactTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactWrapper);