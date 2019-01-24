import React, { Component } from 'react';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { connect } from 'react-redux';
import { getContactListTk, getNotificationsTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';

class ContactWrapper extends Component {
    state={
      isLoading:false
    }
    componentWillMount() {
        this.props.getContactListTk();
        this.props.getNotificationsTk();
        if(!!this.props.exists)window.addEventListener('scroll',this._infiniteScroll,true);
        // 이거 텀을 줘야될것같다.
        console.log('contactList',this.props.contactList)
    }
    _infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        this.setState({
            isLoading:false
        });
        if(scrollTop + clientHeight === scrollHeight){
            this.setState({
                isLoading:true
            });
            this.props.getContactListTk();
        }
    }
    render() {
        const { contactList, notifications} = this.props;
        return (
            <div className="dashboard container">
                <div className="col">
                    <div className="col s12 m5 offset-m1">
                        <Notifications notifications={notifications}/>
                    </div>
                    <div className="c">
                        <Link className='waves-effect waves-light btn' to='/create'>게시글 생성</Link>
                    </div>
                    <div className="col s12 m6">
                        <ContactList contactList={contactList}/>
                        {this.state.isLoading&&this.props.exists?(<div className="loader">Loading ...</div>):''}
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
        notifications: state.contact.notifications,
        exists:state.timeLine.exists
    }
}
const mapDispatchToProps = (dispatch) => ({
    getContactListTk : bindActionCreators(getContactListTk,dispatch),
    getNotificationsTk : bindActionCreators(getNotificationsTk,dispatch)
})

export default connect(mapStateToProps,mapDispatchToProps)(ContactWrapper);