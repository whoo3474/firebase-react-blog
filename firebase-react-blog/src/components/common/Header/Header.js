import React from 'react';
import { NavLink,Link } from 'react-router-dom';

const Header = ({signOutNavs, signInNavs}) => {
    const navList = signOutNavs.map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    // signIn signOut 에 따라 다르게 보여줘야된다.
    return (
        <>

            <nav className="nav-extended grey darken-3">
                <div className="nav-wrapper">
                <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>          
        
                    <Link to="/" className="brand-logo">Minhan Blog</Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        {navList}
                    </ul>
                </div>
            </nav>

       <ul class="sidenav" id="slide-out">
            {navList}
        </ul>
        </>
    );
};

export default Header;
// import React,{Component} from 'react';
// import { NavLink,Link } from 'react-router-dom';
// import M from "materialize-css";

// class Header extends Component{
//     componentDidMount() {
//         var elem = document.querySelector(".sidenav");
//         var instances = M.Sidenav.init(elem);
//     }

//     navList = this.props.signOutNavs.map(
//         nav => (
//             <li>
//                 <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
//             </li>
//         )
//     );
//     // signIn signOut 에 따라 다르게 보여줘야된다.
//     render(){
//         return (
//             <>

//                 <nav className="nav-extended grey darken-3">
//                     <div className="nav-wrapper">
//                     <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>          
            
//                         <Link to="/" className="brand-logo">Minhan Blog</Link>
//                         <ul id="nav-mobile" className="right hide-on-med-and-down">
//                             {this.navList}
//                         </ul>
//                     </div>
//                 </nav>

//         <ul class="sidenav" id="slide-out">
//                 {this.navList}
//             </ul>
//             </>
//         );
//     }
// }

// export default Header;