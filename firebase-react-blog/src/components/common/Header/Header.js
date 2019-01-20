import React,{Component} from 'react';
import { connect } from 'react-redux';
import { NavLink,Link,Redirect } from 'react-router-dom';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import fbConfig from '../../../config/fbConfig';
import { signInNavRoutes, signOutNavRoutes} from '../../../route/nav';
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

    navList = (this.props.isSignedIn ? signInNavRoutes : signOutNavRoutes).map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    // signIn signOut 에 따라 다르게 보여줘야된다.
    render(){
        return (
            <>
            {this.props.redirect ?<Redirect to='/'/>:''}
            {/* logout시 redirect를 true로 하여 /로 돌아간다 */}
                <nav className="nav-extended grey darken-3">
                    <div className="nav-wrapper">
                    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>          
            
                        <Link to="/" className="brand-logo">Minhan Blog</Link>
                        <ul id="nav-mobile" className="right hide-on-med-and-down">
                            {this.navList}
                        </ul>
                    </div>
                </nav>

        <ul class="sidenav" id="slide-out">
                {this.navList}
            </ul>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        isSignedIn : state.auth.isSignedIn,
        redirect: state.auth.redirect
    }
}

export default connect(mapStateToProps)(Header);