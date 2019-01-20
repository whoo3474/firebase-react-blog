import React,{Component} from 'react';
import { connect } from 'react-redux';
import { NavLink,Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {authSignOutTk,authCheckTk} from '../../../store/modules/auth';
import SignedInLink from '../Navbar/SignedInLink';
import SignedOutLink from '../Navbar/SignedOutLink';
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
        // 리듀서로 만들어봐야겠네 상태가 바뀌면 boolen 값으로 저장하기 유저가 들어왔는지 확인해야함
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
                    <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>          
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
    console.log(state);
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
export default connect(mapStateToProps,mapDispatchToProps)(Header);