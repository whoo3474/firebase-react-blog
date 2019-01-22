import React,{Component} from 'react';
import { connect } from 'react-redux';
import { NavLink,Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {authSignOutTk, authCheckTk ,getUserInfoTk} from '../../../store/modules/auth';
import SignedInLink from '../Navbar/SignedInLink';
import SignedOutLink from '../Navbar/SignedOutLink';
import fbConfig from '../../../config/fbConfig';
// import M from "materialize-css";

class Header extends Component{
    // componentDidMount() {
    //     var elem = document.querySelector(".sidenav");
    //     var instances = M.Sidenav.init(elem);
    // }

    // componentDidMount = () => {
    //     fbConfig.auth().onAuthStateChanged(user => {
    //           this.props.isSignedIn=!!user
    //     })
    // }
    componentDidMount = () => {
        
        this.props.authCheckTk();
        this.props.getUserInfoTk();
    }
    handleClick = () => {
        this.props.authSignOutTk();
    }

    // signIn signOut 에 따라 다르게 보여줘야된다.
    render(){
        const links = this.props.isSignedIn ? <SignedInLink handleClick={this.handleClick}/> : <SignedOutLink/> ;
        return (

                <nav className="nav-extended grey darken-3">
                    <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" className="sidenav-trigger"><i className="material-icons">menu</i></a>          
                        <Link to="/" className="brand-logo">Minhan Blog</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            { links }
                        </ul>
                    </div>
                </nav>

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
        authCheckTk : bindActionCreators(authCheckTk,dispatch),
        getUserInfoTk : bindActionCreators(getUserInfoTk,dispatch)
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Header);