import React from 'react';
import Header from '../Header/Header';

// 만들기전에는 생각을 안했으나, 현재 각각의 Page별로 파일을 만들어 놓는것보다
// PageTemplate를 고차함수로 만들어서 Container에 곧장 넣었어도 되었을법도 하다.
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