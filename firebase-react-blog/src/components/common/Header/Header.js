import React,{Component, Children} from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {authSignOutTk, authCheckTk } from '../../../store/modules/auth';
import SignedInLink from '../Navbar/SignedInLink';
import SignedOutLink from '../Navbar/SignedOutLink';
import { CssBaseline, AppBar, IconButton, Toolbar, Typography, Hidden, Drawer, withStyles, MenuList, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { compose } from 'recompose'

const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer +1
    },
    menuButton: {
      marginRight: 20,
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit,
    }
  });

class Header extends Component{
    state = {
        mobileOpen: false,
      };
    
      handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
    componentDidMount = () => {
        this.props.authCheckTk();
        // this.props.getUserInfoTk();
    }
    handleClick = () => {
        this.props.authSignOutTk();
    }

    // signIn signOut 에 따라 다르게 보여줘야된다.
    render(){
        const { classes,children,location } =this.props;
        const {mobileOpen} = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                  <Toolbar>
                    <IconButton
                      color="inherit"
                      aria-label="Open drawer"
                      onClick={this.handleDrawerToggle}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap>
                      Minhan's Blog
                    </Typography>
                    <i className={`${classes.materialIcons} material-icons`}>
                            code
                        </i>
                  </Toolbar>
                </AppBar>
                {/* 상단까지는 Header */}
                <nav className={classes.drawer}>
                  <Hidden xsUp implementation="css">
                    <Drawer
                      container={this.props.container}
                      variant="temporary"
                      open={mobileOpen}
                      onClose={this.handleDrawerToggle}
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                    >
                    {this.props.isSignedIn ? <SignedInLink pathname={location.pathname} handleClick={this.handleClick}/> : <SignedOutLink pathname={location.pathname}/>}
                    </Drawer>
                  </Hidden>
                  <Hidden xsDown implementation="css">
                    <Drawer
                      classes={{
                        paper: classes.drawerPaper,
                      }}
                      variant="permanent"
                      open
                    >
                      {this.props.isSignedIn ? <SignedInLink pathname={location.pathname} handleClick={this.handleClick}/> : <SignedOutLink pathname={location.pathname}/>}
                    </Drawer>
                  </Hidden>
                  {/* 여기서는 크기에따라 보여주는지 안보여주는지를 적음 */}
                </nav>
                
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {children}
                  </main>
            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return{
        isSignedIn : state.auth.isSignedIn,
        redirect: state.auth.redirect
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        authSignOutTk : bindActionCreators(authSignOutTk,dispatch),
        authCheckTk : bindActionCreators(authCheckTk,dispatch)
    }
}
export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
)(Header);