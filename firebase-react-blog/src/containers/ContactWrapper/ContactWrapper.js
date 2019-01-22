import React, { Component } from 'react';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { connect } from 'react-redux';
import { getContactListTk, getNotificationsTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';

class ContactWrapper extends Component {
    componentDidMount() {
        this.props.getContactListTk();
        this.props.getNotificationsTk();
    }
    render() {
        const { contactList, notifications} = this.props;
        return (
            <div className="dashboard container">
                <div className="col">
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                    <div className="col s12 m6 right">
                        <Link className='waves-effect waves-light btn' to='/create'>게시글 생성</Link>
                    </div>
                    <div className="col s12 m6">
                        <ContactList contactList={contactList}/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        contactList : state.contact.contactList,
        notifications: state.contact.notifications
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactListTk : bindActionCreators(getContactListTk,dispatch),
    getNotificationsTk : bindActionCreators(getNotificationsTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactWrapper);