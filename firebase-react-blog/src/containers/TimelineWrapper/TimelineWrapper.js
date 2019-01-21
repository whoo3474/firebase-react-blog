import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import './TimelineWrapper.scss';
import { getTimeList, getTimeListLoad } from '../../store/modules/timeLine';
import { bindActionCreators } from 'redux';

class TimelineWrapper extends Component {
    state = {
        contacts : [],
        totalCount: null,
        scrolling: false
    }

    componentWillMount() {
        this.props.getTimeList();
        //스크롤 만들어보자
        this.scrollListener = window.addEventListener('scroll', (e) =>{
            this.handleScroll(e)
        })
        const {totalCount} = this.props;
        console.log(totalCount);
    }
    handleScroll= (e) => {
        const { scrolling, totalCount, nextPage } = this.props;
        if(scrolling) return;
        const lastLi = document.querySelector('ul.timeline-list > li:last-child');
        console.log(lastLi);
        const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
        const pageOffset = window.pageYOffset + window.innerHeight;
        let bottomOffset = 20;
        if (pageOffset > lastLiOffset - bottomOffset) this.loadMore();
    }

    loadMore = () => {
        if (this.paging.end) {
            return;
        };
        console.log("hello load")
        this.props.getTimeListLoad();
        // scrolling:true;
        // 파이어베이스 호출 해서 rows에 넣어야된다.
    }
 
    render() {
        const{ timelines } = this.props;

        return (
            <div className="wrapper">
                <ul className="timeline-list">
                {
                    timelines.map((card,i) => (
                        <TimelineCards key={i} {...card}/>
                    ))
                }
               </ul>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
       timelines:state.timeLine.timelines,
       totalCount:state.timeLine.totalCount,
       nextPage:state.timeLine.nextPage,
       scrolling:state.timeLine.scrolling
    };
};
const mapDispatchToProps = (dispatch)=>({
    getTimeList : bindActionCreators(getTimeList,dispatch),
    getTimeListLoad : bindActionCreators(getTimeListLoad,dispatch)
})


export default connect(mapStateToProps,mapDispatchToProps)(TimelineWrapper);