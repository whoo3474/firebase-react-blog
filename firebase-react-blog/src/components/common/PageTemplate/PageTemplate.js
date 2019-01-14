import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Navigation from '../navigation/navigation';
import './PageTemplate.scss';
// nav route
import navRoute from '../../../route/nav';

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Navigation navs={navRoute}/>
            <main className="main-content">
            <Header/>
                {children}
            <Footer/>
            </main>
        </div>
    );
};

export default PageTemplate;