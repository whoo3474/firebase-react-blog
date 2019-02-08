import React from 'react';
import Moment from 'react-moment';
import { Redirect, Link } from 'react-router-dom';
import { withStyles,Paper, Grid, Typography, Button, Dialog, DialogTitle, DialogActions } from '@material-ui/core';

const styles = theme => ({
    paper: {
        padding: `${theme.spacing.unit*3}px`,
        width: '100%'
    },
   title: {
     fontSize: 14,
   },
    button: {
      margin: theme.spacing.unit,
    },
    img:{
        maxHeight:'350px',
    }
  });
const ContactDetails = (props) => {
    const {contact, classes,handleClickOpen,handleClose,open,redirect,message, id} = props;
        if(redirect) return <Redirect to='/contact'/>
        console.log('contact',contact)
        return (
               <>
                    <Paper className={classes.paper}>
                        <Grid>
                        <Typography variant="h5" component="h2" gutterBottom>{contact.title}</Typography>
                        <Typography className={classes.content} gutterBottom>{contact.content}</Typography>
                        <Typography className={classes.title} color="textSecondary">Posted by {contact.authorName||'이름없음'}</Typography>
                        {contact.createdAt&&
                        <Typography>
                            <Moment format="YYYY/MM/DD">{contact.createdAt.toDate().toString()}</Moment>
                        </Typography>
                        }
                            {contact.DownloadUrl &&
                            ((contact.contentType=='image/png'||contact.contentType=='image/jpeg')
                            ?
                                (<Grid item>
                                    <img className={classes.img} src={contact.DownloadUrl}/>
                                </Grid>)
                            :'')
                            }
                            </Grid>
                    </Paper>
                    <Button 
                        component={Link}
                        to={'/modify/'+id }
                        variant="contained" 
                        color="primary"
                        className={classes.button} >
                    수정
                    </Button>
                    <Button 
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        onClick={()=>handleClickOpen(contact.id)} >
                    삭제
                    </Button>

                    <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {message}
                            </DialogTitle>
                        <DialogActions>
                            <Button onClick={handleClose} color="primary" autoFocus>
                            확인
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
        );

};

export default withStyles(styles)(ContactDetails);