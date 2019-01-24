import React from 'react';
import Moment from 'react-moment';

// contactWrapper에서 보여줌
const Notifications = (props) => {
    const {notifications} = props;
    return (
        <div className="secondary">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">공지사항</span>
                    <ul className="notifications">
                        <li>
                            { notifications && notifications.map( item => {
                                return (
                                    <li key={item.id}>
                                        <span className="pink-text">{item.user}</span>
                                        <span>{item.content}</span>
                                        <div className="grey-text note-date">
                                            <Moment fromNow>{item.time.toDate()?item.time.toDate():''}</Moment>
                                        </div>
                                    </li>
                                )
                            })}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Notifications;