import React from 'react'
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';
import Moment from 'react-moment';

const styles = theme => ({
    // paper: {
    //     maxWidth: '1200px',
    //     margin: `${theme.spacing.unit}px auto`,
    // },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    content:{
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis'
    }
  });
const ContactSummary = ({contact,key,classes}) => {
    return (
        <Paper id={key} className={classes.paper}>
            <Grid
            container>
                    <Typography variant="h5" component="h2" gutterBottom>{contact.title}</Typography>
                        <Typography className={classes.content} gutterBottom>{contact.content}</Typography>
                    <Typography className={classes.title} color="textSecondary">Posted by {contact.authorName||'이름없음'}</Typography>
                    {contact.createdAt&&
                    <Typography className={classes.pos}>
                        <Moment format="YYYY/MM/DD">{contact.createdAt.toDate().toString()}</Moment>
                    </Typography>
                    }
                    {console.log('contact.DownloadUrl',contact.DownloadUrl)}

            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(ContactSummary);