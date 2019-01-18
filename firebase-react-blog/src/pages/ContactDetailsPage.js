import React from 'react';
import PageTemplate from '../components/common/PageTemplate/PageTemplate';
import ContactDetails from '../components/Contact/ContactDetails';

const ContactDetailsPage = (props) => {
    const id = props.match.params.id;
    return (
        <PageTemplate>
            <ContactDetails id={id}/>
        </PageTemplate>
    );
};

export default ContactDetailsPage;