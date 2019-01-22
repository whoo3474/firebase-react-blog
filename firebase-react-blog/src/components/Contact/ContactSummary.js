import React from 'react';
import moment from 'moment';

const ContactSummary = ({contact,key}) => {
    return (
        <div id={key} className="card z-depth-0 contact-summary">
            <div className="card-content gery-text text-darken-3">
                <span className="card-title">{contact.title}-{contact.id}</span>
            <p>{contact.content}</p>
                <p className="grey-text">{moment(contact.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
};

export default ContactSummary;