import React from 'react';
import './TimelineCards.scss';

const TimelineCards = ({id,title,dt,dd}) => {
    // map 돌리는건 containers에 있어야겠네.
    return(
            <li class="timeline-item" id={id}>
                <div class="card">
                    <h2 class="card-title">{title}</h2>
                    <dl class="card-definition">
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
//img, title, dt, dd, timestamp