import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';

const AboutPage = () => {
    return (
        <PageTemplate>
            {`
             대학교에서는 네트워크와 운영체제, 알고리즘과 자료구조, C, C++, 등을 배웠으며, 언어와 기술을 배우는것을 좋아합니다.
             졸업 학기부터 회사를 다니게 되어, 첫 개발의 시작을 Java 웹 서버로 시작하였으나, 
             Javascript의 재미를 느끼고 React를 공부하게 되었습니다.
             함수형 자바스크립트의 커링구조, 고차함수, 순수함수 등을 공부하고 적용하려고 합니다.
             이 사이트는 Material-UI 와 React, Firebase의 firestore, auth, storage 등으로 만들어졌습니다.
             첫 회사를 나와 프론트개발자로 다시금 시작하고자 이 사이트를 만들게 되었으며, 
             만들면서 그동안 배운 지식들을 적용하며, 새로운 기술들을 배울수 있게되어 얻는것이 많았습니다.`}
        </PageTemplate>
    );
};

export default AboutPage;