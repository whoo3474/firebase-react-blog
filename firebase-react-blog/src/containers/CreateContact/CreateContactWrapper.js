import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose'
import { withStyles, Dialog, DialogTitle, Button, DialogActions, Paper, TextField, Typography, Grid } from '@material-ui/core';

const styles = (theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '100%',
  },
})
class CreateContactWrapper extends Component {
    state ={
        title: '',
        content:'',
        file:'',
        open:false,
        redirect:false
    }

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
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
        const { user, classes } = this.props;
        const { handleClose,handleCloseCreate,handleChange, handleFileChange, handleSubmit} = this;
        if(!user) return <Redirect to='/signin'/>
        else if(this.state.redirect) return <Redirect to='/contact'/>
        return (
            <Paper className="container">
                <form>
                    <Typography variant='h4'>글남기기</Typography>
                        <TextField
                            id="outlined-name"
                            label="제목"
                            className={classes.textField}
                            value={this.state.title}
                            onChange={this.handleChange('title')}
                            margin="normal"
                            variant="outlined"
                            />
                        <TextField
                            id="outlined-multiline-flexible"
                            label="내용"
                            multiline
                            rowsMax="8"
                            value={this.state.content}
                            onChange={this.handleChange('content')}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                            />
                    <input type="file" id="file" onChange={handleFileChange}/>
                    <Grid className="input-field">
                        <Button component="button" color="primary" onClick={handleSubmit}>생성하기</Button>
                    </Grid>
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
            </Paper>
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

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(CreateContactWrapper);