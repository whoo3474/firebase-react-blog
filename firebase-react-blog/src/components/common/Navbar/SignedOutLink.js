import React from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, MenuList, MenuItem, Divider } from '@material-ui/core';


const styles = theme => ({
    toolbar: theme.mixins.toolbar
});

const SignedOutLink = (props) => {
    const { classes, pathname , handleClick} = props;
    return ( 
        <div>
            <Hidden smDown>
                <div className={classes.toolbar} />
            </Hidden>
            <MenuList>
                <MenuItem component={Link} to="/" selected={'/' === pathname}>
                    About
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/timeline" selected={'/timeline' === pathname}>
                    Timeline
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/portfolio" selected={'/portfolio' === pathname}>
                    Portfolio
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/contact" selected={'/contact' === pathname}>
                    Contact
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/signin" selected={'/signin' === pathname}>
                    Login
                </MenuItem>
                <Divider />
            </MenuList>
        </div>
    );
};

export default withStyles(styles)(SignedOutLink);