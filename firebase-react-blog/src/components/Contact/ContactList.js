import React from 'react';
import ContactSummary from './ContactSummary';

// contactWrapper에서 보여줌
const ContactList = ({contacts}) => {

    return (
        <div className="contact-list section">
            { contacts && contacts.map(contact => {
                return (
                    <ContactSummary contact={contact} key={contact.id}/>
                )
            })}
        </div>
    );
};

export default ContactList;