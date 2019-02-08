import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createContactTk, getContactTk } from '../../store/modules/contact';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { compose } from 'recompose'
import { withStyles, Dialog, DialogTitle, Button, DialogActions, Paper, TextField, Typography, Grid, Tooltip, Zoom } from '@material-ui/core';

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
  helpGrid:{
    justifyContent: 'flex-end',
    margin: '10px 0'
  }
})

const helpTooltip = `
    현재 페이지는 하나의 컴포넌트에서 수정과 생성이 가능하도록 만들었습니다.
    수정과 생성이 비슷한 구조라는것을 생각하여, 수정버튼을 누르면 react-router-dom 으로
    이동시키면서 props.match.params 값으로 해당 게시글의 id를 받아와서 id 유무로
    수정과 생성 페이지로 나뉘게 만들었습니다.
    `

class CreateContactWrapper extends Component {
    state ={
        title: '',
        content:'',
        file:'',
        open:false,
        redirect:false,
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
        this.setState({ open: false, redirect: true, });
        this.props.createContactTk(this.state);
      };

    componentDidMount(){
        if(this.props.id){
            this.props.getContactTk(this.props.id)
            this.setState({
                ...this.props.contact,
                open:false,
                file:'',
            })
        }
    }
    render() {
        const { user, classes,id } = this.props;
        const { handleClose,handleCloseCreate, handleFileChange, handleSubmit} = this;
        if(!user) return <Redirect to='/signin'/>
        else if(this.state.redirect) return <Redirect to='/contact'/>
        return (
            <>
            <Grid container className={classes.helpGrid}>
                <Tooltip TransitionComponent={Zoom} title={helpTooltip}>
                <i className="material-icons">
                    help_outline
                </i>
                </Tooltip>
            </Grid>
            <Paper className="container">
                <form>
                    <Typography variant='h4'> {id?'글 수정하기':'글 생성하기'}</Typography>
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
                        <Button component="button" color="primary" onClick={handleSubmit}>{id?'수정':'생성'}</Button>
                    </Grid>
                </form>

                
                <Dialog open={this.state.open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">
                          {`이대로 글을 올릴까요?`}
                        </DialogTitle>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary" autoFocus>
                            돌아가기
                        </Button>
                        <Button onClick={handleCloseCreate} color="primary" autoFocus>
                          {id?'수정하기':'생성하기'}
                     </Button>
                    </DialogActions>
                    </Dialog>
            </Paper>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        contact: state.contact.contact
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createContactTk : bindActionCreators(createContactTk,dispatch),
        getContactTk : bindActionCreators(getContactTk,dispatch),
    }
}

export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(CreateContactWrapper);