import React from 'react';
import './TimelineCards.scss';

const TimelineCards = ({cards}) => {
    // map 돌리는건 containers에 있어야겠네.

            <li class="timeline-item">
                <div class="card">
                    <img class="card-icon" src={card.img}/>>
                    <h2 class="card-title">{card.title}</h2>
                    <dl class="card-definition">
                        <dt>
                            {card.dt}
                        </dt>
                        <dd>
                            {card.dd}
                        </dd>
                    </dl>
                </div>
            </li>
};

export default TimelineCards;