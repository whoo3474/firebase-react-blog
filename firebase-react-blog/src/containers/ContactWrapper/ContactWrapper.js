import React, { Component } from 'react';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { connect } from 'react-redux';
import { getContactListTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';

class ContactWrapper extends Component {
    componentWillMount() {
        this.props.getContactListTk();
    }
    render() {
        const { contactList} = this.props;
        return (
            <div className="dashboard container">
                <div className="col">
                    <div className="col s12 m5 offset-m1">
                        <Link className='waves-effect waves-light btn' to='/create'>게시글 생성</Link>
                    </div>
                    <div className="col s12 m5 offset-m1">
                        <Notifications/>
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
        contactList : state.contact.contactList
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactListTk : bindActionCreators(getContactListTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactWrapper);