import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import fbConfig from '../../config/fbConfig';
import { Grid, Typography, withStyles, Card, CardContent, Paper } from '@material-ui/core';
const styles = theme=> ({
    card: {
        display:"flex",
        flexGrow: 1,
        margin:'50px auto',
        [theme.breakpoints.up('sm')]:{
            width: '500px'
        },
            width: '350px'
    },
    marginAuto:{
        margin:'20px auto',
    },
    textAlign:{
        textAlign: 'center',
    }
  });
class SignInWrapper extends Component {

    uiConfig ={
        signInFlow:"popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: ()=> console.log("가입 성공")
        }
    }
    render() {
        const { authError,user,classes } = this.props;
        if(!!user) return <Redirect to='/'/>
        return (
                <Card className={classes.card}>
                    <CardContent className={classes.marginAuto}>
                    <Typography className={classes.textAlign} component="h3" variant="display2" gutterBottom>로그인 / 회원가입</Typography>
                 
                    <StyledFirebaseAuth
                    className={classes.marginAuto}
                    uiConfig={this.uiConfig}
                    firebaseAuth={fbConfig.auth()}/>
                    </CardContent>
                </Card>
    
               
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isSignedIn : state.auth.isSignedIn,
        user : state.auth.user
    }
}
export default  withStyles(styles)(connect(mapStateToProps)(SignInWrapper));