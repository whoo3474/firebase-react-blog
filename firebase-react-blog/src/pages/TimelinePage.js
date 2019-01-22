import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import TimeLineWrapper from '../containers/TimelineWrapper/TimelineWrapper';
import './TimelinePage.scss';

const TimelinePage = () => {
    return (
        <PageTemplate>
            <div className="cover">
                <h1 className="cover-title">
                    <span className="text-center">타임라인</span>
                </h1>
            </div>
            <TimeLineWrapper/>
        </PageTemplate>
    );
};

export default TimelinePage;