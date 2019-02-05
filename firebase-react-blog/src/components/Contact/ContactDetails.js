import React from 'react';
import Moment from 'react-moment';
import { withStyles,Paper, Grid, Typography } from '@material-ui/core';

const styles = theme => ({
    // paper1: {
    //     maxWidth: '900px',
    //     margin: `${theme.spacing.unit}px auto`,
    //     padding: theme.spacing.unit * 2,
    // },
    title1: {
      fontSize: 14,
    },
    pos1: {
      marginBottom: 12,
    }
  });
const ContactDetails = (props) => {
    const {contact, classes} = props;
        return (
                    <Paper className={classes.paper1}>
                        <Grid container>
                            <Typography variant="h5" component="h2" gutterBottom>{contact.title}</Typography>
                            <Typography component="p" gutterBottom>{contact.content}</Typography>
                            <Typography className={classes.title1} color="textSecondary">Posted by {contact.authorName||'이름없음'}</Typography>
                            {contact.createdAt&&
                            <Typography className={classes.pos1}>
                                <Moment format="YYYY/MM/DD">{contact.createdAt.toDate().toString()}</Moment>
                            </Typography>
                            }
                            {console.log('contact.DownloadUrl',contact)}
                            {(contact.DownloadUrl &&
                                (<Grid item>
                                    <img src={contact.DownloadUrl}/>
                                </Grid>)
                            )}
                                 {contact.DownloadUrl}
                            </Grid>
                    </Paper>
        );

};

export default withStyles(styles)(ContactDetails);