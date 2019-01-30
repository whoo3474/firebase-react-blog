import React from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, MenuList, MenuItem, Divider } from '@material-ui/core';


const styles = theme => ({
    toolbar: theme.mixins.toolbar
});

const SignedInLink = (props) => {
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
                    <MenuItem component={Link} to="/user" selected={'/user' === pathname}>
                        User
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={()=>handleClick()}>
                     LogOut
                    </MenuItem>
                    <Divider />
                </MenuList>
            </div>
        );
    }

export default withStyles(styles)(SignedInLink);