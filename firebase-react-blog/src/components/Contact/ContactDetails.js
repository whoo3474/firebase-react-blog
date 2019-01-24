import React from 'react';
import Moment from 'react-moment';

const ContactDetails = (props) => {
    const {contact} = props;
    console.log(contact);

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
                                Posted by {contact.authorName||'이름없음'}
                            </div>
                            <div>
                                <Moment calendar>{contact.createdAt?contact.createdAt.toDate():''}</Moment>
                            </div>
                        </div>
                    </div>
        );

};

export default ContactDetails;