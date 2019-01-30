import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { authSignInTk, firebaseProvider } from '../../store/modules/auth';
import { Redirect } from 'react-router-dom';
import fbConfig from '../../config/fbConfig';

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
        const { authError,user } = this.props;
        if(!!user) return <Redirect to='/'/>
        return (
            <div className="container">
                {/* <form onSubmit={this.handleSubmit}>
                    <h5>로그인</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn">로그인</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p> : ''}
                        </div>
                    </div>
                </form> */}
                {/* <div className="division"></div> */}
                {/* <button style={{width:"100%"}} 
                    onClick={()=> this.authWithFacebook()}>
                    Log In with Facebook
                </button> */}
                    <h4>로그인 / 회원가입</h4>
                    <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={fbConfig.auth()}/>
               
            </div>
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

export default connect(mapStateToProps)(SignInWrapper);