import React, { Component } from 'react';
import User from '../../components/User/User';
import { connect } from 'react-redux';
import { fireAuth } from '../../config/fbConfig';
import { Grid, ClickAwayListener, Tooltip, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const helpTooltip = `
  User페이지는 프로필사진과 이름, email을 가지고오는 페이지입니다.
  프로필사진이 없다면 기본사진이 들어가게됩니다.
  계정 삭제가 가능합니다.
`
const styles = theme => ({
    root:{
        display:'flex',
        flexDirection:'column',
        maxWidth: 500,
        margin:'10px auto'
    },
    button:{
        width: '130px',
        padding: '8px'
    },
    helpGrid:{
        margin: '10px 0'
    },
});
class UserWrapper extends Component {
    state = {
        open: false,
        openTooltops:false
      };
    
    
      handleTooltipClose = () => {
        this.setState({ openTooltops: false });
      };
  
      handleTooltipOpen = () => {
        this.setState({ openTooltops: true });
      };
      handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
    
    
      handleCloseDelete = () => {
        this.setState({ open: false });
        this.userDelete();
      };
    
    userDelete = () => {
        fireAuth.currentUser.delete().then(function(e){
        }).catch((e)=> {
            console.log('error',e)
        })
    }
    
    render() {
        const {user, classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid container className={classes.helpGrid}>
                    <ClickAwayListener onClickAway={this.handleTooltipClose}>
                    <div>
                        <Tooltip
                        PopperProps={{
                            disablePortal: true,
                        }}
                        onClose={this.handleTooltipClose}
                        open={this.state.openTooltops}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        title={helpTooltip}
                        >
                        <Button onClick={this.handleTooltipOpen}>
                        <i className="material-icons">
                            help_outline
                        </i>
                        </Button>
                        </Tooltip>
                    </div>
                    </ClickAwayListener>
                </Grid>
                <User
                    user={user}
                    open={this.state.open}
                    handleClose={this.handleClose}
                    handleClickOpen={this.handleClickOpen}
                    handleCloseDelete={this.handleCloseDelete}/>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        user : state.auth.user
    }
}
export default withStyles(styles)(connect(mapStateToProps)(UserWrapper));