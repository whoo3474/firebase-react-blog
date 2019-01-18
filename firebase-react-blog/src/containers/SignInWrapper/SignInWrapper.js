import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
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

    componentDidMount = () => {
        fbConfig.auth().onAuthStateChanged(user => {
            this.setState({
              isSignedIn:!!user  
            })
            console.log("user",user)
        })
        // 리듀서로 만들어봐야겠네 상태가 바뀌면 boolen 값으로 저장하기
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
    }
    render() {
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
                    </div>
                </form>
                <div className="division"></div>
                {
                    this.state.isSignedIn?
                    (<div>
                        <div>signedIn</div>
                        <button onClick={()=>fbConfig.auth().signOut()}/>
                        <h1>welcome {fbConfig.auth().currentUser.displayName}</h1>
                        <img alt="profile picture" src={fbConfig.auth().currentUser.photoURL}/>
                    </div>
                    ):
                    (<StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={fbConfig.auth()}/>)
                }
            </div>
        );
    }
}

export default SignInWrapper;