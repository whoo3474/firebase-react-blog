import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import ContactDetailsWrapper from '../containers/ContactDetailsWrapper/ContactDetailsWrapper';

const ContactDetailsPage = (props) => {
    const id = props.match.params.id;
    return (
        <PageTemplate>
            <ContactDetailsWrapper id={id}/>
        </PageTemplate>
    );
};

export default ContactDetailsPage;