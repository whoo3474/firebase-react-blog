import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
class CreateContactWrapper extends Component {
    state ={
        title: '',
        content:'',
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createContact(this.state);
    }
    render() {
        const { user } = this.props;
        if(!user) return <Redirect to='/signin'/>
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit}>
                    <h5>글쓰기</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={this.handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={this.handleChange}>
                       
                        </textarea>
                    </div>
                    <div className="input-field">
                        <button className="btn">생성</button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createContact : bindActionCreators(createContactTk,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateContactWrapper);