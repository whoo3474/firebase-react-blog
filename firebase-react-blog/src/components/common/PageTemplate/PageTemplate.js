import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
// nav route

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Header>
                {children}
                <Footer/>
            </Header>
        </div>
    );
};

export default PageTemplate;