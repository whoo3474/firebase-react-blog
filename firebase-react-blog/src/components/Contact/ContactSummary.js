import React from 'react';
import Moment from 'react-moment';

const ContactSummary = ({contact,key}) => {
    return (
        <div id={key} className="card z-depth-0 contact-summary">
            <div className="card-content gery-text text-darken-3">
                <span className="card-title">{contact.title}</span>
            <p>{contact.content}</p>
            <p className="grey-text">Posted by {contact.authorName||'이름없음'}</p>
            <p className="grey-text">
              <Moment calendar>{contact.createdAt?contact.createdAt.toDate():''}</Moment>
            </p>
            </div>
           {(contact.DownloadUrl &&
            (<div>
                <img className="card" src={contact.DownloadUrl}/>
            </div>)
            )
           ||(<div className="loader">Loading ...</div>)}
        </div>
    );
};

export default ContactSummary;