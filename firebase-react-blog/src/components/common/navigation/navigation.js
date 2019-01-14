import React from 'react';
import { NavLink } from 'react-router-dom';
import './navigation.scss';

const navigation = ({navs}) => {
    const navList = navs.map(
        nav => (
            <li>
                <NavLink to={nav.to} activeClassName={nav.activeName}>{nav.name}</NavLink>
            </li>
        )
    );
    return (
        <div className="nav-body">
            <h2>
                Menu
            </h2>
            <ul className="menu">
                {navList}
            </ul>
        </div>
    );
};

export default navigation;

// import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import Link from '@material-ui/core/Link';
// import AppBar from './AppBar';
// import Toolbar, { styles as toolbarStyles } from './Toolbar';

// const styles = theme => ({
//   title: {
//     fontSize: 24,
//   },
//   placeholder: toolbarStyles(theme).root,
//   toolbar: {
//     justifyContent: 'space-between',
//   },
//   left: {
//     flex: 1,
//   },
//   leftLinkActive: {
//     color: theme.palette.common.white,
//   },
//   right: {
//     flex: 1,
//     display: 'flex',
//     justifyContent: 'flex-end',
//   },
//   rightLink: {
//     fontSize: 16,
//     color: theme.palette.common.white,
//     marginLeft: theme.spacing.unit * 3,
//   },
//   linkSecondary: {
//     color: theme.palette.secondary.main,
//   },
// });
// function navigation(props) {
//   const { classes } = props;

//   return (
//     <div>
//       <AppBar position="fixed">
//         <Toolbar className={classes.toolbar}>
//           <Link
//             variant="h6"
//             underline="none"
//             color="inherit"
//             className={classes.left}
//             href="/premium-themes/onepirate"
//           >
//             {'Minhan'}
//           </Link>
//           <div className={classes.right}>
//             <Link
//               color="inherit"
//               variant="h6"
//               underline="none"
//               className={classes.rightLink}
//               href="/timeline"
//             >
//               {'TimeLine'}
//             </Link>
//             <Link
//               variant="h6"
//               underline="none"
//               className={classNames(classes.rightLink, classes.linkSecondary)}
//               to="/premium-themes/onepirate/sign-up"
//             >
//               {'Sign Up'}
//             </Link>
//           </div>
//         </Toolbar>
//       </AppBar>
//       <div className={classes.placeholder} />
//     </div>
//   );
// }

// navigation.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(navigation);