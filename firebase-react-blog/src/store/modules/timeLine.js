import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type

const GET_TIMELINE = 'GET_TIMELINE';
const GET_TIMELINE_LOAD = 'GET_TIMELINE_LOAD';
// action creators

const getTimeline = createAction(GET_TIMELINE);
const getTimelineLoad = createAction(GET_TIMELINE_LOAD);

export const getTimeList = () => {
    return (dispatch, getState)=>{
        const state = getState().timeLine;
        const countList = state.countList;
        const TimeListFirst = fbConfig.firestore().collection('Timelines');
        //전체 문서의 수를 세기위함
        TimeListFirst.orderBy('index','desc').limit(countList).get().then((querySnapshot)=> {
            const lastBoard = querySnapshot.docs[querySnapshot.docs.length-1];
            const rows = []; 
            querySnapshot.forEach((doc) => { 
                const childData = doc.data(); 
                rows.push(childData);}
            ); 
           dispatch(getTimeline(rows));
           dispatch(getTimelineLoad(lastBoard));
        });
    };
};

export const getTimeListLoad = () => {
    return (dispatch, getState) => {
        const state = getState().timeLine;
        const lastBoard = state.lastBoard;
        const countList = state.countList;
        const exists = state.exists;
        const rows = []; 
        let TimeListFirst = fbConfig.firestore().collection('Timelines').orderBy('index','desc');
        if(!!exists){
            if(!!lastBoard){
                TimeListFirst.startAfter(lastBoard).limit(countList).get().then((querySnapshot)=> {
                    querySnapshot.forEach((doc) => { 
                        const childData = doc.data(); 
                        rows.push(childData);
                    });
                    const lastBoard = querySnapshot.docs[querySnapshot.docs.length-1];
                    dispatch(getTimeline(rows));
                    dispatch(getTimelineLoad(lastBoard));
                })
            }else{
                TimeListFirst.limit(countList).get().then((querySnapshot)=> {
                    querySnapshot.forEach((doc) => { 
                        const childData = doc.data(); 
                        rows.push(childData);
                    });
                    const lastBoard = querySnapshot.docs[querySnapshot.docs.length-1];
                    dispatch(getTimeline(rows));
                    dispatch(getTimelineLoad(lastBoard));
                })
            }
        }

     };
 };


// initial state
const initialState = {
    timelines: []
    // page state도 만들어줘야겠다. orderBy().limit() <- 갯수정하기 가능. 처음에는 앞쪽꺼부터
    ,
    lastBoard:'',
    // 마지막 인덱스
    exists:true,
    countList:3,
    //한페이지에 출력될 게시물 수
};

// reducer
export default handleActions({
    [GET_TIMELINE]: (state, action) => {
        return {
            ...state,
            timelines: [...state.timelines, ...action.payload],
        }
    },

    [GET_TIMELINE_LOAD]: (state, action) => {
        return {
            ...state,
            lastBoard:action.payload,
            exists: action.payload?(action.payload.exists?action.payload.exists:''):''
            // payload가 있니? 그럼 거기에 exists가 있니? 그럼 저장
        }
    }
}, initialState);