import React from 'react';
import Moment from 'react-moment';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    paper: {
      minWidth: 'auto',
      margin: `${theme.spacing.unit}px auto`,
      padding: theme.spacing.unit * 2,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });
const ContactSummary = ({contact,key,classes}) => {
    return (
        <Paper id={key} className={classes.paper}>
            <Grid xs wrap="nowrap" spacing={16}>
                    <Typography variant="h5" component="h2" >{contact.title}</Typography>
                    <Typography nowrap component="p">{contact.content}</Typography>
                    <Typography className={classes.title} color="textSecondary">Posted by {contact.authorName||'이름없음'}</Typography>
                    <Typography className={classes.pos}>
                        {contact.createdAt?contact.createdAt:''}
                    </Typography>

            </Grid>
           {/* {(contact.DownloadUrl &&
            (<div>
                <img className="card" src={contact.DownloadUrl}/>
            </div>)
            )
           ||(<div className="loader">Loading ...</div>)} */}
        </Paper>
    );
};

export default withStyles(styles)(ContactSummary);