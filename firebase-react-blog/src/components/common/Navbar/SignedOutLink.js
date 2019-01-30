import React from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, MenuList, MenuItem, Divider } from '@material-ui/core';


const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    materialIcons : {
        marginRight: '10px'
    }
});

const SignedOutLink = (props) => {
    const { classes, pathname } = props;
    return ( 
        <div>
            <Hidden xsDown>
                <div className={classes.toolbar} />
            </Hidden>
            <MenuList>
                <MenuItem component={Link} to="/" selected={'/' === pathname}>
                <i className={`${classes.materialIcons} material-icons`}>
                    sentiment_very_satisfied
                </i>
                    About
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/timeline" selected={'/timeline' === pathname}>
                <i className={`${classes.materialIcons} material-icons`}>
                    timeline
                </i>
                    Timeline
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/portfolio" selected={'/portfolio' === pathname}>
                <i className={`${classes.materialIcons} material-icons`}>
                    import_contacts
                </i>
                    Portfolio
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/contact" selected={'/contact' === pathname}>
                <i className={`${classes.materialIcons} material-icons`}>
                    forum
                </i>
                    Contact
                </MenuItem>
                <Divider />
                <MenuItem component={Link} to="/signin" selected={'/signin' === pathname}>
                <i className={`${classes.materialIcons} material-icons`}>
                  person_add
                </i>
                    Login
                </MenuItem>
                <Divider />
            </MenuList>
        </div>
    );
};

export default withStyles(styles)(SignedOutLink);