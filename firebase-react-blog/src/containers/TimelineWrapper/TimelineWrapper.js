import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import { getTimeListLoad } from '../../store/modules/timeLine';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'recompose'
import './TimelineWrpper.scss';

const styles = theme => ({
    absoluteProgress:{
        position:'absolute',
        right:50,
        bottom:-50,
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
  });
class TimelineWrapper extends Component {
    state={
        isLoading:false
    }
    componentWillMount() {
        this.props.getTimeListLoad();
        if(!!this.props.exists)window.addEventListener('scroll',this._infiniteScroll,true);
        // 이거 텀을 줘야될것같다.
    }
    _infiniteScroll = () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        let clientHeight = document.documentElement.clientHeight;
        this.setState({
            isLoading:false
        });
        if(scrollTop + clientHeight === scrollHeight){
            this.setState({
                isLoading:true
            });
            this.props.getTimeListLoad();
        }
    }


    render() {
        const{ timelines, classes} = this.props;
        return (
            <div className="wrapper">
                <ul className="timeline">
                {
                    timelines.map((card,i) => (
                        <TimelineCards key={i} {...card}/>
                    ))
                }
               </ul>
               {this.state.isLoading&&this.props.exists?
                (
                    <div className={classes.absoluteProgress}>
                      <CircularProgress className={classes.progress} />
                    </div>)
                :
                ''}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
       timelines:state.timeLine.timelines,
       exists:state.timeLine.exists
    };
};
const mapDispatchToProps = (dispatch)=>({
    getTimeListLoad : bindActionCreators(getTimeListLoad,dispatch)
})


export default compose(
    withStyles(styles),
    connect(mapStateToProps,mapDispatchToProps)
    )(TimelineWrapper);