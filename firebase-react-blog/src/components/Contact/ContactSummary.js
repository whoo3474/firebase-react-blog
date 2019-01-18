import React from 'react';

const ContactSummary = ({contact}) => {
    return (
        <div className="card z-depth-0 contact-summary">
            <div className="card-content gery-text text-darken-3">
                <span className="card-title">{contact.title}</span>
            <p>{contact.content}</p>
                <p className="grey-text">2019년 1월17일 23시</p>
            </div>
        </div>
    );
};

export default ContactSummary;