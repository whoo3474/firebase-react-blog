import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import './PageTemplate.scss';
// nav route

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Header/>
            <main className="main-content">
                {children}
            <Footer/>
            </main>
        </div>
    );
};

export default PageTemplate;