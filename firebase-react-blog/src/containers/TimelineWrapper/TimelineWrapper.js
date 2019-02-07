import React, { Component } from 'react';
import { connect } from 'react-redux';
import TimelineCards from '../../components/TimelineCards/TimelineCards';
import { getTimeListLoad } from '../../store/modules/timeLine';
import { bindActionCreators } from 'redux';
import { withStyles, Grid, Tooltip, Zoom } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { compose } from 'recompose'
import './TimelineWrpper.scss';

const styles = theme => ({
    root:{
        padding: theme.spacing.unit * 2,
    },
    absoluteProgress:{
        position:'absolute',
        right:50,
        bottom:-50,
    },
    progress: {
      margin: theme.spacing.unit * 2,
    },
    helpGrid:{
      justifyContent: 'flex-end',
      margin: '10px 0'
    }
  });
  
const helpTooltip = `
Portfolio 페이지는 js의 배열값들을 캐럿셀로 보여주는 페이지입니다.
Material-Ui의 AutoPlaySwipeableViews를 사용했으며, 상단의 버튼으로 사이트를 새창으로 띄워줍니다.
제가 만든 사이트들의 일부이며, 저의 gitHub에서 코드들을 확인하실수있습니다.
`
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
            <div className={classes.root}>
            <Grid container className={classes.helpGrid}>
                <Tooltip TransitionComponent={Zoom} title={helpTooltip}>
                <i className="material-icons">
                    help_outline
                </i>
                </Tooltip>
            </Grid>
            <div className="cover">
                <h1 className="cover-title">
                    <span className="text-center">Minhan`s TimeLine</span>
                </h1>
            </div>
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