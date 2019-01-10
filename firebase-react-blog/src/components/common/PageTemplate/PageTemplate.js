import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const PageTemplate = ({children}) => {
    return (
        <div className="page-template">
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
};

export default PageTemplate;