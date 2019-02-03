import React from 'react';
import Header from '../Header/Header';

const PageTemplate = ({children}) => {
    return (
        <div className="page-template" style={{marginBottom:'60px'}}>
            <Header>
                {children}
            </Header>
        </div>
    );
};

export default PageTemplate;