import React from 'react';
import ContactSummary from './ContactSummary';

// contactWrapper에서 보여줌
const ContactList = () => {
    return (
        <div className="project-list section">
            <ContactSummary/>
            <ContactSummary/>
            <ContactSummary/>
            <ContactSummary/>
        </div>
    );
};

export default ContactList;