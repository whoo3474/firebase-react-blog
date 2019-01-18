import React from 'react';

const ContactDetails = ({contact}) => {
    return (
                <div className="card z-depth-0">
                    <div className="card-content">
                        <span className="card-title">{contact.title}</span>
                        <p> 
                            {contact.content}
                        </p>
                    </div>
                    <div className="card-action grey-lighten-4 gery-text">
                        <div>
                            Posted by {contact.authorName}
                        </div>
                        <div>
                            2019년 1월17일 23시
                        </div>
                    </div>
                </div>
    );
};

export default ContactDetails;