import React, { Component } from 'react';

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
    }
    render() {
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

export default CreateContactWrapper;