import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authSignInTk } from '../../store/modules/auth';
import fbConfig from '../../config/fbConfig';

class SignInWrapper extends Component {

    state ={
        email: '',
        password:'',
        firestName:'',
        lastName:'',
        isSignedIn: false
    }
    
    uiConfig ={
        signInFlow:"popup",
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GithubAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            signInSuccess: ()=> false
        }
    }
    // 이건 여기에 있는게 맞는거같음


    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.authSignInTk(this.state);
        console.log('currentUser',fbConfig.auth().currentUser);
    }
    render() {
        const { authError } = this.props;
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
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
                </form>
                <div className="division"></div>
                {/* {
                    this.props.isSignedIn?
                    (<div>
                        <div>로그인이 되었습니다.</div>
                        <button onClick={()=>fbConfig.auth().signOut()}>로그아웃</button>
                        <h1>welcome {fbConfig.auth().currentUser.displayName}</h1>
                        <img alt="profile picture" src={fbConfig.auth().currentUser.photoURL}/>
                    </div>
                    ):
                    (<StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={fbConfig.auth()}/>)
                } */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isSignedIn : state.auth.isSignedIn,
        authError : state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authSignInTk : bindActionCreators(authSignInTk,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignInWrapper);