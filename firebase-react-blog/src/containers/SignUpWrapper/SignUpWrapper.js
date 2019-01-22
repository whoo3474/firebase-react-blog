import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAuthEmailTk } from '../../store/modules/auth';
import { Redirect } from 'react-router-dom';

class SignUpWrapper extends Component {

    state ={
        email: '',
        password:'',
        name:'',
    }

    handleChange = (e) => {
        console.log(email,password);
        const {email,password} = this.state;
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createAuthEmailTk(this.state);
    }
    render() {
        const { user, authError } = this.props;
        if(!!user) return <Redirect to='/'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5>회원가입</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <button className="btn">회원가입</button>
                        <div className="red-text center">
                            { authError ? <p>{authError}</p>:''}
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        isSignedIn : state.auth.isSignedIn,
        user : state.auth.user,
        authError : state.auth.authError
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        createAuthEmailTk : bindActionCreators(createAuthEmailTk,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SignUpWrapper);