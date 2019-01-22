import React from 'react';
import ContactSummary from './ContactSummary';
import { Link } from 'react-router-dom';

// contactWrapper에서 보여줌
const ContactList = ({contactList}) => {

    return (
        <div className="contact-list section">
            { contactList && contactList.map(contact => {
                return (
                    <Link to={'/contact/'+contact.id }>
                      <ContactSummary contact={contact} key={contact.id}/>
                    </Link>
                )
            })}
        </div>
    );
};

export default ContactList;