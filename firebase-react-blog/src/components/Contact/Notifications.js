import React from 'react';

// contactWrapper에서 보여줌
const Notifications = () => {
    return (
        <div className="secondary">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">공지사항</span>
                    <ul className="notifications">
                        <li>
                            공지사항
                        </li>
                        <li>
                            공지사항
                        </li>
                        <li>
                            공지사항
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notifications;