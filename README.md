# firebase-react-blog
진행중인 블로그

create-react-app firebase-react-blog
npm install --save redux react-redux redux-actions immutable react-router open-color

블로그 구조 잡기
===============

루트의 index.js 에는 redux의 createStroe를 하여 provider를 적용한다.
provider가 없을때는 모든 컴포넌트에 store을 적용해줘야 하였음.(과거)
react-router

사용 기술
--------
* firebase      -
* react-router  - 클라이언트 라우팅이 가능하다. SPA 특성상 html이 하나이고, 나머지는 webpack이라는 모듈 번들러로 만들어진 파일로 받아오게된다.
                그 정보를 통해 개발자가 정한 url마다 보여주고싶은 컴포넌트를 지정해줄수 있다.
                장점 : 이미 파일을 받아온 상태이고, 번들링을 한 이후이기 때문에 이전 파일들보다 가벼워졌다.
                단점 : 초기 사이트를 받아오는데 시간이 조금더 걸린다. - 코드 스플리팅을 권장
                
                
* redux         - react에서 단방향(양방향이 가능하지만)데이터 흐름을 양방향으로 한 store에서 관리할수 있도록 한다.</p>
                - 기본적인 사용법은 store을 provider로 감싸주고, connect로 연결 시켜준후에, this.props 에서 store의 값과 actionsCreator의 함수를 사용할수 있게된다. compoenentDidMount에서 초기화로 값들을 받아 렌더링 해주고, 이후 이벤트에 액션생성자를 넣고 이벤트가 일어나면 실행시켜야하며, 이벤트들을 컴포넌트들에 적용시킨다.
<PRE><CODE>
  *before*
  const mapDispatchToProps = (dispatch) => ({
    InputActions: {
      setInput: (value) => dispatch(inputActions.setInput(value))
    }
  })
  
  *after*
  const mapDispatchToProps = (dispatch) => ({
    InputActions: bindActionCreator(inputActions, dispatch)
  })
  호출 => this.props.InputActions.setInput
</CODE></PRE>

* react-redux   - 기존에 store.getState() , dispatch, subscribe 등을 connect로 극복하게 해주고, context api 등의 설정 없이 store을 provider로 설정가능하게 도와준다.
* redux-thunk   - redux에서 콜백형식으로 객체가 아닌 함수를 리턴할수 있도록 하는 redux-middleware
<PRE><CODE>
 ** store 생성시 **
  import reducers from './store';
  import ReduxThunk from 'redux-thunk';
  
  const store = createStore(reducers,applyMiddleware(ReduxThunk));
 
 //////////////////////////////////////////////////////////////////
 
**reducer 내부**
  import { handleActions, createAction } from 'redux-actions';

  //redux-actions
  const INCREMENT = 'counter/INCREMENT'
  export const increment = createAction(INCREMENT);

  //redux-thunk
  export const incrementAsync = () => (dispatch, getState) => {
    setTimeout(
      () => { dispatch(increment()) },
      1000
    );
  }
  
  export default handleActions({
    [INCREMENT] : (state, action) => state + 1
  }, 0);
  
</CODE></PRE>

* axios - 보통 componentDidMount 에서 axios를 사용하여 REST API를 요청한다. ~ 비동기작업 ~ redux-thunk와 함께 사용
<PRE><CODE>
  **reducer 파일**
  import { handleActions, createActions } from 'redux-actions';
  import axios from 'axios';
  
  function getPostAPI(postId) {
    return axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`
  }
  
  const GET_POST_PENDING = 'GET_POST_PENDING';
  const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
  const GET_POST_FAILURE = 'GET_POST_FAILURE';
  
  const getPostPending = createAction(GET_POST_PENDING);
  const getPostSuccess = createAction(GET_POST_SUCCESS);
  const getPostFailure = createAction(GET_POST_FAILURE);
  
  **redux-thunk**
  export const getPost = (postId) => dispatch => {
    dispatch(getPostPending());
    
    return getPostApi(postId).then((response) => {
      dispatch(getPostSuccess(response))
      return response;
    }).catch(error => {
      dispatch(getPostFailure(error));
      throw(error);
    })
  }
  
  **reducer 부분**
  
  const initialState = {
    pending: false,
    error: false,
    data: {
      title: '',
      body: ''
    }
  }
  
  export dafault handleActions({
    [GET_POST_PENDING]: (state,action) => {
      return {
        ...state,
        pending: true,
        error: false
      }
    },
    [GET_POST_SUCCESS]: (state,action) => {
      const { title, body } = action.payload.data;
      return {
        ...state,
        pending: false,
        data: {
          title,
          body
        }
      }
    },
    [GET_POST_FAILURE]: (state,action) => {
      return {
        ...state,
        pending: false,
        error: true
      }
    }
  }, initialState);
    
  **App.js 에서 호출시 **
  
  class App extends Componenet {
    loadData = () => {
      const { PostActions, number } = this.props;
      PostActions.getPost(number).then(
        (response) => {
          console.log(response);
        }
      ).catch(
        (error) => {
          console.log(error);
      );
    }
   componentDidMount() {
    this.loadData();
   }
   componentDidUpadate(prevProps, prevState) {
    if(this.props.number !== prevProps.number) {
      this.loadData();
    }
   }
   render() {
    const { number, post, error, loading } = this.props;
    
    return(
      <div>
        {
          loading
          ?( 로딩중 ... )
          : (
            error
            ?( 오류 발생!)
            : (
                <div>
                  {post.title}
                  {post.body}
                </div>
              )
           )
          
      </div>
    );
   }
  }
  
  export default connect(
    (state) => ({
      number: state.counter,
      post : state.post.data,
      loading : state.post.pending,
      error: state.post.error
    }),
    (dispatch) => ({
      PostActions : bindActionCreators(postActions, dispatch)
    })
  )(App);
  
    
  
</CODE></PRE>


* redux-action  - action 의 기본 설정을 쉽게해준다.
<PRE><CODE>
  {
    ####액션 객체 선언시
    
    import { createAction, handleActions } from 'redux-actions';
    
    *before*
    export const increment = (index) => ({
      type : types.INCREMENT,
      index
    });
    *after*
    export const increment = createAction(types.INCREMENT,({index})=>({index}));
    >두번째 파라미터는 생략가능. 명시적 표시
  
    #### 리듀서 switch 문 대신 handleAction 사용
    
    const initialState = {
      conter : 0
    }
    *before*
    const counter(state=initialState, action) {
      switch (action.type) {
        case types.INCREMENT:
          return {
            counter : state.counter + action.counter         
          };
        case types.DECREMENT:
          return {
            counter : state.counter - action.counter
          }
        default:
         return state;
      }
   }
  
   *after*
    
    const counter2 = handleActions({
      INCREMENT: (state, action) => ({
        counter : state.counter + action.payload
        }),
      DECREMENT: (state, action) => ({
        counter : state.counter - action.payload
      })
    },initialState);
  
  }
  </CODE></PRE>
  
* immutable     - 불변성을 지키기 수월하게 해준다.
  <pre><code>
  {
    ####객체는 Map, 배열은 List 로 표시하여 조작한다.
    *before*
    let test = 
    [
      {
        index : 1,
        value : 'woo'
      },
      {
        index : 1,
        value : 'woo'
      }
    ]
    
    *after*
    const { List, Map, fromJS } = Imuutable;
    let test2 = 
    List([
      Map({
        index : 1,
        value : 'woo'
      }),
      Map({
        index : 1,
        value : 'woo'
      })
    ]);
    //or
    let test3 = 
    fromJS([
      {
        index : 1,
        value : 'woo'
      },
      {
        index : 1,
        value : 'woo'
      }
    ]);
    
    >List, Map 을 쓰지않고 fromJS를 써도 된다. 자바스크립트 배열과 객체로 변환시에는 toJS
  }
  
  **get, update, set**
  
  기존에는 store에서 가져온 값을 todo.id, todo.texxt 등으로 객체 내부값에 접근하였지만, todos안의 값들을 Map으로 설정해놓은 상태이면 get함수로 값을 조회해야한다.
  
  render() {
    const {todos, onToggle, onRemove } = this.props;  //todo reduce에서 가져온값. todos는 initialState로 Map과 List로 이루어져 있음
    const todoList = todos.map(
      todo => (
        <TodoItem
          key={todo.get('id')}
          done={todo.get('done')}
          onToggle={() => onToggle(Todo.get('id))}
          onRemove={() => onRemove(todo.get('id))}>
          {todo.get('text')}
        </TodoItem>
      )
    );
   return (
    <div>
      {todoList}
    </div>
  }
  </code></pre>
* open-color    - 색상들을 비트형식이 아닌 *oc-gray-1* 등의 문자열로 적을수 있어 알아보기 쉽고 간단하다.

페이지 설명
-----------
메뉴 - ABOUT(자기소개)
아코디언 예제 ( 열정, 끈기, 긍정) 같은느낌으로 본인 사진3장? 
그후 나에 대해서 보여주기

메뉴 - TIMELINE
타임라인 그래프로
학교, 스터디, 학원, 과외 ..등
(상단에 JAVA, NODE, ES6, JAVASCRIPT..등 이미지를 같이 첨부하면 좋을듯. 스터디, 과외,학교 등을 적어가며)

메뉴 - CONTACT
상단에는 게시글은 방명록의 느낌으로 가면 될것같다. - 들어간후에는 로그인 시, 댓글기능
하단에는 내 GITHUB 랑 이메일 주소 +@로 고정을 걸어놓고
=> 컨테이너를 두개로 나눠서 
정렬 - 날짜 순으로 최근과 오래된순으로 구별해보자.
검색기능도 넣어서 정상적인 게시판처럼 보이면 좋을것같다.
[1][2][3][4] 같이 페이징 기능으로 넣을까?


메뉴 - PORTFOLIO
포트폴리오는 한 7개정도? (버스 ~ css 예제들 - react 예제들)
하단은 무한 스크롤 방식으로(다른방식으로?)

메뉴 - 로그인기능 추가.

---반복되는 값들은 redux에 값을넣어서 map 으로 구현할필요가 있다. Career/Skills, PORTFOLIO, CONTACT
---ABOUT은 적당히 데이터만 그대로 넣어주면 될것같다.

폴더 설명
--------
* container => 리덕스와 connect 하여 store의 정보를 가져오고, 액션을 dispatch 하는 용도.
* component => css 적용 및 props로 정보들을 받아서 보여주는 용도.
* component/Header => react-router 의 Link 요소를 모아두는 헤더, 메뉴바
* store     => redux를 사용하기 위한 용도
* page      => page 구분을 한다.
<PRE><CODE>
  //이 안에 페이지들을 넣는 개념
  **src/components/common/PageTemplate/PageTemplate.js**
  const PageTemplate = ({children}) => (
    <div>
      <Header/>
      <Main>
        {children}
      </Main>
      <Footer/>
    </div>
  );
  export default PageTemplate;
  
  //page 구현
  **src/pages/ListPage.js**
  const ListPage = () => {
    return (
      <PageTemplate>
        <ListWrapper>
          <PostList/>
        </ListWrapper>
      </PageTemplate>
    );
  };
  export default ListPage;
  </CODE></PRE>
* style     => 공통 style 요소들을 모아두기위한 용도
* lib       => 모듈로서 나눠 사용하기 위한 용도

사이트 맵
--------
<pre>
/ 
   - /src
        - index.js         => ReactDOM.render
        - Root.js          => component/App.js import. createStore, provider, BrowserRouter 적용
        - /components
            - /common
              - /PageTemplate
                 -PageTemplate.js
              - /Header
                 -Header.js     => Link
              - /MainWrapper
                 -MainWrapper.js
              - /Footer
                 -Footer.js
            - App.js         => react-router-dom 적용 - Switch, Route

            - test.js
        - /conteiner
            - test.js
        - /page
            - About.js
            - TimeLine.js
            - Portfolio.js
            - Contact.js
            - Login.js        => 모달창으로 구현?
        - /store
            - TimeLine.js
            - Portfolio.js
            - Contact.js
            - index.js       => combineReducer
        - /lib
            - firebase_auth.js
            - firestore.js
        - /style
            - base.scss
            - test.scss
      
</pre>  
