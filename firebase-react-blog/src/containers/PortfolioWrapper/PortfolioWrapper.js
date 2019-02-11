import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Grid, Tooltip, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, ClickAwayListener } from '@material-ui/core';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    label: '버스 예약 사이트_사용자 ~ PC, Mobile',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/fir-react-blog.appspot.com/o/portfolio%2FbusClient.PNG?alt=media&token=cbe76a45-21b5-48ba-8d61-041b899ed83a',
    url:'http://mahatech.iptime.org:7007/',
    description:`첫 회사에서 제작한 버스 예약 사용자 사이트입니다.
    디자인회사와 협업하여 기능부터 DB설계, JAVA서버와 SQL, 호스팅, AWS ES2리눅스 서버, RDS-MariaDB까지 모든 부분을 도맡아 하였습니다.
    아이디는 test, 비밀번호는 test로 들어가실수 있습니다.`
  },
  {
    label: '버스 예약 사이트_관리자 ~ PC',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/fir-react-blog.appspot.com/o/portfolio%2FbusAdmin.PNG?alt=media&token=128d4b2f-120f-4954-b47d-f1325d8ada00',
    url:'http://mahatech.iptime.org:7007/admin',
    description:`버스 예약 관리자 사이트입니다.
    사용자 사이트에서 선택할수있는 모든 기능을 제어할수 있으며, 사용자 및 버스, 패널티등을 설정할수 있습니다.
    아이디는 1, 비밀번호는 1로 들어가실수 있습니다.
    관리자 계정으로는 사용자 사이트 접속이 가능하지만, 사용자 아이디로 관리자 사이트 접속이 불가능합니다.
    현재 몇몇기능을 사용하기 좋게 기존에서 빼놓은 상태입니다.`
  },
  {
    label: 'sass 연습페이지',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/fir-react-blog.appspot.com/o/portfolio%2Fscss.PNG?alt=media&token=9d960992-970d-446d-a819-f2592370d7ca',
    url:'https://whoo3474.github.io/LoremSassProject/',
    description:`scss를 연습하기 위하여 만든 사이트입니다.`
  },
  {
    label: '칵테일 페이지',
    imgPath:
      'https://firebasestorage.googleapis.com/v0/b/fir-react-blog.appspot.com/o/portfolio%2Fcocktail.PNG?alt=media&token=2371c757-fd92-4ea9-ad1a-33509116e757',
    url:'https://whoo3474.github.io/cocktail-website/',
    description:`css를 연습하기 위하여 만든 사이트입니다.`
  }
];

const styles = theme => ({
  root: {

    [theme.breakpoints.up('sm')]: {
      maxWidth: 400*2,
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: 400*3,
  },
    maxWidth: '350px',
    flexGrow: 1,
    margin: '20px auto'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingLeft: theme.spacing.unit * 4,
    backgroundColor: theme.palette.background.default,
  },
  img: {
    [theme.breakpoints.up('sm')]: {
        maxWidth: 400*2,
        height: 255*2,
    },
    [theme.breakpoints.up('xl')]: {
       maxWidth: 400*3,
        height: 255*3,
    },
    height: 255,
    display: 'block',
    maxWidth: 400,
    overflow: 'hidden',
    width: '100%',
  },
  helpGrid:{
    margin: '10px 0'
  },
  heading: {
    fontWeight: theme.typography.fontWeightRegular,
  },
  button:{
    width: '145px',
    padding: '6px'
  }
});

const helpTooltip = `
  Portfolio 페이지는 js의 배열값들을 캐럿셀로 보여주는 페이지입니다.
  Material-Ui의 AutoPlaySwipeableViews를 사용했으며, 상단의 버튼으로 사이트를 새창으로 띄워줍니다.
  제가 만든 사이트들의 일부이며, 저의 gitHub에서 코드들을 확인하실수있습니다.
`

class PortfolioWrapper extends Component {
    state = {
        activeStep: 0,
        openTooltops:false
      };
    
    handleTooltipClose = () => {
      this.setState({ openTooltops: false });
    };

    handleTooltipOpen = () => {
      this.setState({ openTooltops: true });
    };
        handleNext = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep + 1,
        }));
      };
    
      handleBack = () => {
        this.setState(prevState => ({
          activeStep: prevState.activeStep - 1,
        }));
      };
    
      handleStepChange = activeStep => {
        this.setState({ activeStep });
      };
    
      render() {
        const { classes} = this.props;
        const { activeStep } = this.state;
        const maxSteps = tutorialSteps.length;
    
        return (
          <div className={classes.root}>
              <Grid container className={classes.helpGrid}>
                <ClickAwayListener onClickAway={this.handleTooltipClose}>
                  <div>
                    <Tooltip
                      PopperProps={{
                        disablePortal: true,
                      }}
                      onClose={this.handleTooltipClose}
                      open={this.state.openTooltops}
                      disableFocusListener
                      disableHoverListener
                      disableTouchListener
                      title={helpTooltip}
                    >
                      <Button onClick={this.handleTooltipOpen}>
                      <i className="material-icons">
                        help_outline
                      </i>
                      </Button>
                    </Tooltip>
                  </div>
                </ClickAwayListener>
              </Grid>
          
            <Paper square elevation={0} className={classes.header}>
              <Typography variant="h5" gutterBottom>{tutorialSteps[activeStep].label}</Typography>
              <Button className={classes.button} target="_blank" href={tutorialSteps[activeStep].url} variant="contained" color="primary">사이트 보기</Button>
            </Paper>
            <AutoPlaySwipeableViews
              axis={'x'}
              index={activeStep}
              onChangeIndex={this.handleStepChange}
              enableMouseEvents
            >
              {tutorialSteps.map((step, index) => (
                <div key={step.label}>
                  {Math.abs(activeStep - index) <= 2 ? (
                    <img className={classes.img} src={step.imgPath} alt={step.label} />
                  ) : null}
                  
                  <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6" className={classes.heading}>포트폴리오 설명 (Click!)</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>
                    {step.description}
                    </Typography>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                </div>
              ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              className={classes.mobileStepper}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {<KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  { <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
        );
    }
}

export default  withStyles(styles)(PortfolioWrapper);