import React from 'react'
import { withStyles, Paper, Grid, Typography, Chip } from '@material-ui/core';
import Moment from 'react-moment';

const styles = theme => ({
     paper: {
         padding: `${theme.spacing.unit*3}px`,
         width: '100%'
     },
    title: {
      fontSize: 14,
    },
    content:{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    width: '250px',
    height: '20px',
    [theme.breakpoints.up('sm')]: {
        width: '800px',
    },
    },
    inlineBlock:{
        display:'inline-block'
    },
    chip: {
      margin: theme.spacing.unit,
    },

  });
const ContactSummary = ({contact,key,classes}) => {
    return (
        <Paper id={key} className={classes.paper}>
            <Grid>
                    <Typography variant="h5" component="h2" gutterBottom>{contact.title}</Typography>
                    <Typography className={classes.content} gutterBottom>{contact.content}</Typography>
                    <Typography className={classes.title} color="textSecondary">Posted by {contact.authorName||'이름없음'}</Typography>
                    {contact.createdAt&&
                    <Typography className={classes.inlineBlock}>
                        <Moment format="YYYY/MM/DD">{contact.createdAt.toDate().toString()}</Moment>
                    </Typography>
                    }
                    {contact.contentType&&
                        <Chip label={contact.contentType} className={classes.chip} variant="outlined" />
                    }
            </Grid>
        </Paper>
    );
};

export default withStyles(styles)(ContactSummary);