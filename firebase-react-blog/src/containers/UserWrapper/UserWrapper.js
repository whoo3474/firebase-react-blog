import React, { Component } from 'react';
import User from '../../components/User/User';
import { connect } from 'react-redux';
import { fireAuth } from '../../config/fbConfig';


class UserWrapper extends Component {
    state = {
        open: false,
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
            console.log("계정삭제 완료",e)
        }).catch((e)=> {
            console.log("계정 삭제 실패",e)
        })
    }
    
    render() {
        const {user} = this.props;
        return (
            <div>
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
export default connect(mapStateToProps)(UserWrapper);