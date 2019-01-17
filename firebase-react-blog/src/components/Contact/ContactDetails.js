import React from 'react';

//ContactList를 클릭하면 보여줌
const ContactDetails = () => {
    return (
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Project title</span>
                    <p> 
                    Project text
                    </p>
                </div>
                <div className="card-action grey-lighten-4 gery-text">
                    <div>
                        Posted by Minhan
                    </div>
                    <div>
                        2019년 1월17일 23시
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactDetails;