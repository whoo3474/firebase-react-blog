import React from 'react';
import { Redirect } from 'react-router-dom';
import {  Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Card, Typography, CardMedia, CardContent, Button } from '@material-ui/core';
import userDefaultImage from './userDefaultImage.png';
import DeleteIcon from '@material-ui/icons/Delete';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        maxWidth: 500,
        margin:'30px auto'
      },
      media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
      },
      button: {
        margin: theme.spacing.unit,
        padding : '8px'
      },
      delete:{
        marginRight: '5px'
      }
})

const User = (props) => {
    const { user, classes,handleClickOpen,handleClose,handleCloseDelete,open } = props;
    if(!user) return <Redirect to='/'/>
    return (
    <div>
        <Card className={classes.card}>
          {user.photoURL ? 
          <CardMedia 
          className={classes.media} 
          alt="profile picture" 
          image={user.photoURL} />
           : 
           <CardMedia 
           className={classes.media} 
           alt="profile picture" 
           image={userDefaultImage} />}
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              반갑습니다 {user.displayName}님!
            </Typography>
            <Typography gutterBottom component="p">
              email : {user.email}
            </Typography>
          </CardContent>

          <Button variant="contained" color="secondary" className={classes.button} onClick={()=>handleClickOpen()}>
            <DeleteIcon className={classes.delete} />
            계정 삭제
          </Button>
        </Card>

        <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">
            {"계정을 삭제하시겠습니까?"}
            </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              저의 사이트를 이용해주셔서 감사했습니다. :)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              취소
            </Button>
            <Button onClick={handleCloseDelete} color="primary" autoFocus>
              삭제
            </Button>
          </DialogActions>
        </Dialog>
    </div>);
};

export default withStyles(styles)(User);