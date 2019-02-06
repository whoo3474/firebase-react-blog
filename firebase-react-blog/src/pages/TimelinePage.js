import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import TimeLineWrapper from '../containers/TimelineWrapper/TimelineWrapper';

const TimelinePage = () => {
    return (
        <PageTemplate>
            <div className="cover">
                <h1 className="cover-title">
                    <span className="text-center">Minhan`s TimeLine</span>
                </h1>
                <h2>
                    제가 배워왔던 기술들을 나열하는 페이지입니다.
                </h2>
            </div>
            <TimeLineWrapper/>
        </PageTemplate>
    );
};

export default TimelinePage;