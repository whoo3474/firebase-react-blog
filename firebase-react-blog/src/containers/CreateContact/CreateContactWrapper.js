import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { Dialog, DialogTitle, Button, DialogActions } from '@material-ui/core';
class CreateContactWrapper extends Component {
    state ={
        title: '',
        content:'',
        file:'',
        open:false,
        redirect:false
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id] : e.target.value
        })
    }
    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            open:true ,redirect: false
        })
    }
    handleClose = () => {
        this.setState({ open: false });
      };
    
    handleCloseCreate = () => {
        this.setState({ open: false, redirect: true  });
        this.props.createContactTk(this.state);
      };




    render() {
        const { user } = this.props;
        const { handleClose,handleCloseCreate,handleChange, handleFileChange, handleSubmit} = this;
        if(!user) return <Redirect to='/signin'/>
        else if(this.state.redirect) return <Redirect to='/contact'/>
        return (
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <h5>글쓰기</h5>
                    <div className="input-field">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" onChange={handleChange} />
                    </div>
                    <div className="input-field">
                        <label htmlFor="content">Content</label>
                        <textarea id="content" className="materialize-textarea" onChange={handleChange}>
                       
                        </textarea>
                    </div>
                    <div className="divider"/>
                    <input type="file" id="file" onChange={handleFileChange}/>
                    <div className="input-field">
                        <button className="btn">생성</button>
                    </div>
                </form>

                
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                        {"이대로 방명록을 작성할까요?"}
                        </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            돌아가기
                        </Button>
                        <Button onClick={handleCloseCreate} color="primary" autoFocus>
                            생성하기
                        </Button>
                    </DialogActions>
                    </Dialog>
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
        createContactTk : bindActionCreators(createContactTk,dispatch)
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CreateContactWrapper);