import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './PageTemplate.scss';
// nav route
import { signInNavRoutes, signOutNavRoutes} from '../../../route/nav';

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Header signOutNavs={signOutNavRoutes} signInNavs={signInNavRoutes}/>
            <main className="main-content">
                {children}
            <Footer/>
            </main>
        </div>
    );
};

export default PageTemplate;