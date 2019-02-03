import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect,Link } from 'react-router-dom';
import Notifications from '../../components/Contact/Notifications';
import ContactList from '../../components/Contact/ContactList';
import { getContactListTk, getNotificationsTk } from '../../store/modules/contact';
import { compose } from 'recompose'
import { Paper, Grid, Button, withStyles, Dialog, DialogContent, DialogActions, DialogTitle } from '@material-ui/core';

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
      isLoading:false,
      open: false,
      redirect:false,
      create:false
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

    handleClickOpen = () => {
        if(this.props.user){
            this.setState({ create:true})
        }
        this.setState({ open: true, redirect: false})
    };
    
    //CREATE 페이지에서도 로그인을 하지 않을시 signin 페이지로 리다이렉트 하게 만들었으나,
    //로그인을 안한 사용자에게는 모달창을 보여주고 싶었음.
    // render 에서 button을 로그인시, 로그인을 안할시 다르게 보여주려고 하였으나, 파이어베이스와 redux에서
    // 해당 로그인 값을 가져오기전에 이미 render을 끝내놓아서 로그인을 안했을때 보여주는 버튼만 게속 나왔음.
    // 간단하게 state에서 값을 조정하여, 리다이렉트를 하도록 만듦. ~ 현업에서는 어떨까?
    
    handleClose = () => {
        this.setState({ open: false });
      };
    
    handleCloseSignIn = () => {
        this.setState({ open: false, redirect: true  });
      };

    render() {
        const { contactList, notifications, classes} = this.props;
        const { handleClose,handleCloseSignIn,handleClickOpen} = this;
        if(this.state.redirect){return <Redirect to='/signin'/>}
        else if(this.state.create){return <Redirect to='/create'/>}
        return (

            <div className={classes.root}>
                <Paper className={classes.paper}>
                    <Grid>
                        <Notifications notifications={notifications}/>
                    </Grid>
                </Paper>
                   <Button component="button" color="primary" onClick={() => handleClickOpen()} variant="contained" className={classes.button}>
                         게시글 생성
                   </Button> 
                <div>
                    {console.log('contactList',contactList)}
                        <ContactList contactList={contactList}/>
                        {this.state.isLoading&&this.props.exists?(<div className="loader">Loading ...</div>):''}
                </div>

                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"글쓰기는 로그인이 필요합니다."}
                        </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            돌아가기
                        </Button>
                        <Button onClick={handleCloseSignIn} color="primary" autoFocus>
                            로그인하러 가기
                        </Button>
                    </DialogActions>
                    </Dialog>
                </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        contactList : state.contact.contactList,
        notifications: state.contact.notifications,
        exists:state.timeLine.exists,
        user:state.auth.user
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