import React from 'react';

const TimelineCards = ({id,title,dt,dd,icon}) => {
    // map 돌리는건 containers에 있어야겠네.
    return(
            <li className="timeline-item" id={id}>
                <div className="card">
                    {!!icon?<img class="card-icon" src={icon}/>:''}
                    <h2 className="card-title">{title}</h2>
                    <dl className="card-definition">
                        <dt>
                            {dt}
                        </dt>
                        <dd>
                            {dd}
                        </dd>
                    </dl>
                </div>
            </li> 
    ) 
};

export default TimelineCards;