import React from 'react';
import Moment from 'react-moment';
import { Grid,Typography, Divider } from '@material-ui/core';

// contactWrapper에서 보여줌
const Notifications = (props) => {
    const {notifications} = props;
    return (
                <Grid>
                    <Typography variant="h4" gutterBottom>공지사항</Typography>
                    <ul className="notifications">
                        <li>
                            { notifications && notifications.map( item => {
                                return (
                                    <li key={item.id}>
                                        <Typography variant="body1" gutterBottom>{item.user} {item.content}</Typography>
                                        <Moment fromNow>{item.time.toDate()?item.time.toDate():''}</Moment>
                                        <Divider />
                                    </li>
                                )
                            })}
                        </li>
                    </ul>
                </Grid>
    );
};

export default Notifications;