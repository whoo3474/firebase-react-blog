import React, { Component } from 'react';
import { Paper, Grid, Typography, withStyles, Divider, Button } from '@material-ui/core';

const styles = theme => ({
    mainFeaturedPost: {
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing.unit* 4
      },
      mainFeaturedPostContent: {
        padding: `${theme.spacing.unit * 2}px`,
        [theme.breakpoints.up('md')]: {
          paddingRight: 0,
          padding: `${theme.spacing.unit * 6}px`,
        },
        mainGrid: {
          marginTop: theme.spacing.unit * 3,
        },
        markdown: {
          padding: `${theme.spacing.unit * 3}px 0`,
        },
      },
      sidebarAboutBox: {
        padding: theme.spacing.unit * 2,
        backgroundColor: theme.palette.grey[200],
      },
      button: {
        textAlign:'center',
        padding:'0'
      },
      icon: {
        width:'25px',
        height:'25px'
      }
})

class AboutWrapper extends Component {
    render() {  
        const { classes } = this.props;
        return (
        <div>
          <Paper className={classes.mainFeaturedPost}>
            <Grid container>
              <Grid item md={10}>
                <div className={classes.mainFeaturedPostContent}>
                  <Typography component="h1" variant="h4" color="inherit" gutterBottom>
                    방문해주셔서 감사합니다! :)
                  </Typography>
                  <Typography variant="h5" color="inherit" paragraph>
                    저 자신에 대해서 나열하기 위한 사이트입니다.
                    <br/>
                    About 페이지에서는 이 블로그가 어떤 식으로 만들어졌는가와 고민을 했던 것들에 대해서 적어보았습니다.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Paper>
          <Grid container spacing={40} className={classes.mainGrid}>
            {/* Main content */}
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                제작자에 대해서
              </Typography>
              <Divider />
                <Typography variant="body2" className={classes.markdown} gutterBottom>
                    대학교에서는 네트워크와 운영체제, 알고리즘과 자료구조, C, C++, 등을 배웠으며, 언어와 기술을 배우는 것을 좋아합니다.
                    <br/>
                    졸업 학기부터 회사를 다니게 되어, 첫 개발의 시작을 Java 웹 서버로 시작하였으나, 
                    Javascript의 재미를 느끼고 React를 공부하게 되었습니다.
                    <br/>
                    함수형 자바스크립트의 커링구조, 고차함수, 순수함수 등을 공부하고 적용하려고 합니다.
                 </Typography>

              <Typography variant="h6" gutterBottom>
                블로그를 만들며
              </Typography>
              <Divider />
                <Typography variant="body2" className={classes.markdown} gutterBottom>
                    이 사이트를 만들기 전에는 서버를 nodeJs 또는 스프링으로 고민을 하다가, react 개발자로 전환을
                    하고자 하는 것이 목적이기에, 빠르게 구현하는 것을 목표로 하여 firebase로 NoSQL 데이터베이스인 firestore와
                    파일 등을 담고자 할 때 쓰는 firebase storage, 그리고 인증 기능을 구현하는 firebase auth 등을 사용하였고,
                    firebase에서 제공하는 함수와 호스팅을 제공받았습니다.
                    <br/>
                    처음에는 사이트 구조를 기획하고, DB를 어느 정도 설계한 후, 벤치마킹할 사이트를 찾은 뒤 진행하였으며,
                    Page와 redux를 위한 store, 뷰를 담당할 컴포넌트 폴더와 redux와의 소통을 위한 컨테이너 폴더를 생성하였습니다.
                    그 후, firebase의 기능들을 통해 값을 주고받고 수정, 삭제, 인증 기능 등을 먼저 구현을 한 뒤,
                    Material-UI를 입히는 작업을 시작하였습니다.
                    <br/>
                    가장 어려웠던 부분은, Firestore의 특성상 페이지 네이션 구현은 가능하지만, 만들 때는 모든 데이터베이스의 값을 가져와야 해서,
                    초기 사이트 접속에서 많은 시간을 잡아먹을 수 있다는 점입니다.
                    그래서 차선책으로 무한 스크롤을 구현을 하려 하였으나, 현재는 PC버전에서만 정상작동을 하고 모바일에서는 정상작동을 하지 않아 시도 중입니다.
                    그외에는 JAVA 서버 개발자로 첫 시작을 하였던 저에게는, firebase와 material-ui는 이번 기회에 첫 접하게 된 것이고, 문서도
                    한글 번역이 안 되어있거나, 명확하지 않아서 구글 영어 검색과 youtube 외국 강의 등을 많이 참고하였습니다.
                    <br/>
                    디자인까지 끝난 시점에서는, 오류를 줄이기 위한 리팩토링을 시작합니다.
                    propsType과 defaultProps 등을 추가하고, 작성된 코드들을 명확하게 폴더, 문서별로 나누어져 있는지 확인하며, Promise를
                    반환하는 함수들은 async&await로 바꾸어서 가독성을 높이고자 합니다.
                    또한, redux-thunk를 사용하였지만, redux-saga도 브런치를 나누어서 사용하고자 하며, Typescript 스터디를 진행 중이기에,
                    적용하며, jest로 테스팅을 고려 중입니다.
                    <br/>
                    첫 회사를 나와 프론트 개발자로 다시금 시작하고자 이 사이트를 만들게 되었으며,
                    첫 포트 폴리오로써, 사이트를 만들면서 그동안 배운 지식들을 적용하고,
                    새로운 기술들을 배울 수 있게 되어 얻는 것이 많았습니다.
                 </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                    관심
                </Typography>
                <Typography gutterBottom>
                 저에 대해서 궁금하시거나, react, material-ui, fireabase로 
                  만들어진 이 사이트가 궁금하시다면, connact 페이지에 글을 올려주시거나,
                  이메일로 연락을 주세요!
                  </Typography>
              </Paper>
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                    연락
                </Typography>
                    <Typography  variant="body1">
                    Email  : minhan_a@naver.com
                    </Typography>
                    <Typography  variant="body1">
                    github : https://github.com/whoo3474
                    </Typography>
                </Grid>
        
            </Grid>
        
          </div>
        );
    }
}

export default withStyles(styles)(AboutWrapper);