import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { getContactListTk, getNotificationsTk } from '../../store/modules/contact';
import { compose } from 'recompose'
import { Paper, Grid, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: `0 ${theme.spacing.unit * 1.5}px`,
    },
    paper: {
      minWidth: 'auto',
      margin: `${theme.spacing.unit}px auto`,
      padding: theme.spacing.unit * 2,
    },
    button: {
      margin: theme.spacing.unit,
    },
  });
  
class ContactWrapper extends Component {
    state={
      isLoading:false
    }
    componentDidMount() {
        this.props.getContactListTk();
        this.props.getNotificationsTk();
    }
    componentWillMount() {
        // this.props.getContactListTk();
        // this.props.getNotificationsTk();
        if(!!this.props.exists&&!this.state.isLoading)window.addEventListener('scroll',this._infiniteScroll,true);
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
        const { contactList, notifications, classes} = this.props;
        return (
            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid>
                        <Notifications notifications={notifications}/>
                    </Grid>
                </Paper>
                        <Button color="primary" variant="contained" className={classes.button} component={Link} to="/create" >
                            게시글 생성
                        </Button>
                <div>
                        <ContactList contactList={contactList}/>
                        {this.state.isLoading&&this.props.exists?(<div className="loader">Loading ...</div>):''}
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

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(ContactWrapper);