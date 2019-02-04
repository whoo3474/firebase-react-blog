import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { authSignInTk, firebaseProvider } from '../../store/modules/auth';
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

    // state ={
    //     email: '',
    //     password:'',
    //     firestName:'',
    //     lastName:'',
    //     isSignedIn: false
    // }
    
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
    // 이건 여기에 있는게 맞는거같음


    // handleChange = (e) => {
    //     this.setState({
    //         [e.target.id] : e.target.value
    //     })
    // }
    // handleSubmit = (e) => {
    //     e.preventDefault();
    //     this.props.authSignInTk(this.state);
    //     console.log('currentUser',fbConfig.auth().currentUser);
    // }
    // authWithFacebook = () => {
    //     this.props.firebaseProvider()
    // }
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
        // authError : state.auth.authError,
        user : state.auth.user
    }
}
// const mapDispatchToProps = (dispatch) => {
//     return {
//         firebaseProvider: bindActionCreators(firebaseProvider,dispatch),
//         authSignInTk : bindActionCreators(authSignInTk,dispatch)
//     }
// }

export default  withStyles(styles)(connect(mapStateToProps)(SignInWrapper));