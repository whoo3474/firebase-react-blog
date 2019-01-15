import React, { Component } from 'react';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import './TimelineWrapper.scss';

class TimelineWrapper extends Component {
    renderCards = () => {
        const { cards } = this.props;
        return cards.map( (card,i) => (
            <TimelineCards key={i} card={card}/>
        ))
    }
 
    render() {
        const{ renderCards } = this;
        return (
            <div className="wrapper">
                {renderCards()}         
            </div>
        );
    }
}

export default TimelineWrapper;