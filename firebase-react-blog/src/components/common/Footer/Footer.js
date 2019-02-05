import React from 'react';
import { Link } from 'react-router-dom';
import {withStyles, Grid, Typography, Button } from '@material-ui/core';
const styles = theme => ({
  root : {
    [theme.breakpoints.up('sm')]: {
      left: '240px',
      width: '100vw',
    }, 
         [theme.breakpoints.down('sm')]: {
          left: '0',
          width: '100vw',
    },
    position:'fixed',
    bottom:0,
    flexGrow: 1,
    padding: theme.spacing.unit,
  }
})
const Footer = (props) => {
  const { classes} =props;
    return (

        <footer className={classes.root}>
            <Grid container>
            <Typography variant="body1"  align="center" color="textSecondary" component="p">© 2019 Copyright WooJeongMin. All rights reserved.</Typography>
            </Grid>
        </footer>
    );
};

export default withStyles(styles)(Footer);