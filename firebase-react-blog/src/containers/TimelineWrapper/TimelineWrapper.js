import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import './TimelineWrapper.scss';
import { getTimeList } from '../../store/modules/timeLine';
import { bindActionCreators } from 'redux';

class TimelineWrapper extends Component {
    // getTime = () => {
    //     firestore.collection('Timelines').get().then((querySnapshot)=> {
    //         console.log(querySnapshot);
    //         querySnapshot.forEach((doc) => {
    //             console.log(doc.data());
    //         });
    //     });
    // }

    componentDidMount() {
        this.props.getTimeList();
    }
    //  renderCards = () => {
    //     const{ timelines } = this.props;
    //     console.log('hello');
    //     return timelines.map( (card,i) => (
    //         <TimelineCards key={i} id={card.id} title={card.title} dt={card.dt} dd={card.dd}/>
    //     ))
    // }
 
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
       timelines:state.timelines
    };
};
const mapDispatchToProps = (dispatch)=>({
    getTimeList : bindActionCreators(getTimeList,dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(TimelineWrapper);