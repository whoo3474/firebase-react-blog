import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import CreateContactWrapper from '../containers/CreateContact/CreateContactWrapper';

const CreactContactPage = (props) => {
    const id = props.match.params.id;
    return (
        <PageTemplate>
            <CreateContactWrapper id={id}/>
        </PageTemplate>
    );
};

export default CreactContactPage;