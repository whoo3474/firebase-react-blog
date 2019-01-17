import React, { Component } from 'react';

class SignInWrapper extends Component {

    handleChange = (e) => {
        console.log(e);
    }
    handleSubmit = (e) => {
        console.log(e);
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
            </div>
        );
    }
}

export default SignInWrapper;