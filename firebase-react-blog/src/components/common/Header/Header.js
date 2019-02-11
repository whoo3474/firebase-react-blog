import React,{Component, Children} from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {authSignOutTk, authCheckTk } from '../../../store/modules/auth';
import SignedInLink from '../Navbar/SignedInLink';
import SignedOutLink from '../Navbar/SignedOutLink';
import { CssBaseline, AppBar, IconButton, Toolbar, Typography, Hidden, Drawer, withStyles, MenuList, MenuItem, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { compose } from 'recompose'
import Footer from '../Footer/Footer';

const drawerWidth = 240;
const styles = theme => ({
    root: {
      display: 'flex',
      position:'relative'
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
    },
    button: {
      textAlign:'center',
      padding:'0'
    },
    icon: {
      width:'30px',
      height:'30px'
    }
  });

class Header extends Component{
    state = {
        open: false,
        mobileOpen: false,
      };
    handleClickOpen = () => {
        this.setState({ open: true });
        console.log('handleClickOpen')
      };
    
    handleClose = () => {
        this.setState({ open: false });
      };
    
    handleCloseSignOut = () => {
        this.setState({ open: false });
        this.props.authSignOutTk();
      };
    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
    componentDidMount = () => {
        this.props.authCheckTk();
        // this.props.getUserInfoTk();
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
                  <Button className={classes.button} onClick={() => { window.location = 'https://github.com/whoo3474/firebase-react-blog'; return null;} } target="_blank">
                    <svg className={classes.icon} focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                        <g>
                        <path d="M12,2C6.48,2 2,6.48 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12C22,6.48 17.52,2 12,2Z">
                        </path>
                        </g>
                    </svg>
                    </Button>
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
                    {this.props.isSignedIn ?
                     <SignedInLink 
                     pathname={location.pathname} 
                     open={this.state.open}
                    handleClose={this.handleClose}
                    handleClickOpen={this.handleClickOpen}
                    handleCloseSignOut={this.handleCloseSignOut}
                     /> 
                    : <SignedOutLink pathname={location.pathname}/>}
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
                      {this.props.isSignedIn ?
                         <SignedInLink 
                         pathname={location.pathname} 
                         open={this.state.open}
                        handleClose={this.handleClose}
                        handleClickOpen={this.handleClickOpen}
                        handleCloseSignOut={this.handleCloseSignOut}
                         /> 
                         : 
                         <SignedOutLink pathname={location.pathname}/>}
                    </Drawer>
                  </Hidden>
                  {/* 여기서는 크기에따라 보여주는지 안보여주는지를 적음 */}
                </nav>
                
                <main className={classes.content}>
                  <div className={classes.toolbar} />
                  {children}
                  <Footer/>
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