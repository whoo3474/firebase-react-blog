import React from 'react';
import { Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Hidden, MenuList, MenuItem, Divider } from '@material-ui/core';
import {} from '@material-ui/icons/AssignmentInd'


const styles = theme => ({
    toolbar: theme.mixins.toolbar,
    materialIcons : {
        marginRight: '10px'
    }
});

const SignedInLink = (props) => {
    const { classes, pathname , handleClick} = props;
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
                    <MenuItem component={Link} to="/user" selected={'/user' === pathname}>
                    <i className={`${classes.materialIcons} material-icons`}>
                        assignment_ind
                    </i>
                        User
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={()=>handleClick()}>
                    <i className={`${classes.materialIcons} material-icons`}>
                       sentiment_dissatisfied
                    </i>
                     LogOut
                    </MenuItem>
                    <Divider />
                </MenuList>
            </div>
        );
    }

export default withStyles(styles)(SignedInLink);