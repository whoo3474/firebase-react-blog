# firebase-react-blog
진행중인 블로그

블로그 구조 잡기
===============

루트의 index.js 에는 redux의 createStroe를 하여 provider를 적용한다.
provider가 없을때는 모든 컴포넌트에 store을 적용해줘야 하였음.(과거)
react-router

사용 기술
--------
firebase      -
react-router  - 클라이언트 라우팅이 가능하다. SPA 특성상 html이 하나이고, 나머지는 webpack이라는 모듈 번들러로 만들어진 파일로 받아오게된다.
                그 정보를 통해 개발자가 정한 url마다 보여주고싶은 컴포넌트를 지정해줄수 있다.
                장점 : 이미 파일을 받아온 상태이고, 번들링을 한 이후이기 때문에 이전 파일들보다 가벼워졌다.
                단점 : 초기 사이트를 받아오는데 시간이 조금더 걸린다. - 코드 스플리팅을 권장
redux         - react에서 단방향(양방향이 가능하지만)데이터 흐름을 양방향으로 한 store에서 관리할수 있도록 한다.
react-redux   - 기존에 store.getState() , dispatch, subscribe 등을 connect로 극복하게 해주고, context api 등의 설정 없이 store을 provider로 설정가능하게 도와준다.
redux-thunk   - redux에서 콜백형식으로 객체가 아닌 함수를 리턴할수 있도록 하는 redux-middleware
redux-action  - action 의 기본 설정을 쉽게해준다.
immutable     - 불변성을 지키기 수월하게 해준다.
open-color    - 색상들을 비트형식이 아닌 oc-gray-1 등의 문자열로 적을수 있어 알아보기 쉽고 간단하다.

폴더 설명
--------
container => 리덕스와 connect 하여 store의 정보를 가져오고, 액션을 dispatch 하는 용도.
component => css 적용 및 props로 정보들을 받아서 보여주는 용도.
store     => redux를 사용하기 위한 redux

페이지 설명
-----------


사이트 맵
--------

  - component
  - conteiner
  - store
  
