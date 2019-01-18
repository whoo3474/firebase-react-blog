import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import './TimelineWrapper.scss';
import { getTimeList } from '../../store/modules/timeLine';
import { bindActionCreators } from 'redux';

class TimelineWrapper extends Component {

    componentWillMount() {
        this.props.getTimeList();
    }
 
    render() {
        const{ timelines } = this.props;
        return (
            <div className="wrapper">
               {
                   timelines.map((card,i) => (
                    <TimelineCards key={i} id={card.id} title={card.title} dt={card.dt} dd={card.dd}/>
                 ))
               }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
       timelines:state.timeLine.timelines
    };
};
const mapDispatchToProps = (dispatch)=>({
    getTimeList : bindActionCreators(getTimeList,dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(TimelineWrapper);