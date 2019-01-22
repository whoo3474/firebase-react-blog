import React from 'react';
import moment from 'moment';

const ContactSummary = ({contact,key}) => {
    return (
        <div id={key} className="card z-depth-0 contact-summary">
            <div className="card-content gery-text text-darken-3">
                <span className="card-title">{contact.title}</span>
            <p>{contact.content}</p>
            <p className="grey-text">Posted by {contact.authorName||'이름없음'}</p>
            <p className="grey-text">{moment(contact.createdAt.toDate()).calendar()}</p>
            </div>
        </div>
    );
};

export default ContactSummary;