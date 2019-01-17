import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './PageTemplate.scss';
// nav route
import navRoute from '../../../route/nav';

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Header navs={navRoute}/>
            <main className="main-content">
                {children}
            <Footer/>
            </main>
        </div>
    );
};

export default PageTemplate;