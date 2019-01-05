# firebase-react-blog
진행중인 블로그

블로그 구조 잡기

루트의 index.js 에는 redux의 createStroe를 하여 provider를 적용한다.
provider가 없을때는 모든 컴포넌트에 store을 적용해줘야 하였음.(과거)
react-router

container => 리덕스와 connect 하여 store의 정보를 가져오고, 액션을 dispatch 하는 용도.
component => css 적용 및 props로 정보들을 받아서 보여주는 용도.
store     => redux를 사용하기 위한 redux

/ - component
  - conteiner
  - store
  
