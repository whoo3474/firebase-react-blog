import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type

const GET_TIMELINE = 'GET_TIMELINE';
const GET_TIMELINE_NEXT = 'GET_TIMELINE_NEXT';
const GET_TIMELINE_TOTAL = 'GET_TIMELINE_TOTAL';
const GET_TIMELINE_LOAD = 'GET_TIMELINE_LOAD';
// action creators

const getTimeline = createAction(GET_TIMELINE);
const getTimelineNext = createAction(GET_TIMELINE_NEXT);
const getTimelineTotal = createAction(GET_TIMELINE_TOTAL);
const getTimelineLoad = createAction(GET_TIMELINE_LOAD);

export const getTimeList = () => {
    return (dispatch, getState)=>{
        const state = getState().timeLine;
        const countList = state.countList;
        const TimeListFirst = fbConfig.firestore().collection('Timelines');
        //전체 문서의 수를 세기위함
        TimeListFirst.get().then((total)=> {
            dispatch(getTimelineTotal(total.size));
        });
        TimeListFirst.orderBy('title').start().limit(countList).get().then((querySnapshot)=> {
            console.log(querySnapshot);
            console.log(querySnapshot.empty);
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            dispatch(getTimelineNext(lastVisible));
            const rows = []; 
            querySnapshot.forEach((doc) => { 
                const childData = doc.data(); 
                rows.push(childData);}
            ); 
           dispatch(getTimeline(rows));
        });
    };
};

export const getTimeListLoad = () => {
    return (dispatch, getState) => {
        const state = getState().timeLine;
        const next = state.nextPage;
        const total = state.totalCount;
        const countList = state.countList;
        const TimeListFirst = fbConfig.firestore().collection('Timelines');
        TimeListFirst.orderBy('title').startAfter(next).limit(countList).get().then((querySnapshot)=> {
            const lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];
            dispatch(getTimelineNext(lastVisible));
            const rows = []; 
            querySnapshot.forEach((doc) => { 
                const childData = doc.data(); 
                rows.push(childData);}
            ); 
            dispatch(getTimelineLoad(rows));
         });
     };
 };


// initial state
const initialState = {
    timelines: []
    // page state도 만들어줘야겠다. orderBy().limit() <- 갯수정하기 가능. 처음에는 앞쪽꺼부터
    ,
    loading:false,
    end:false,
    countList:3,
    //한페이지에 출력될 게시물 수
    currentPageIndex:0,
    //현재 페이지 번호
    nextPage:'',
    totalCount:0,
    //총 게시물 수
    scrolling:false
};

// reducer
export default handleActions({
    [GET_TIMELINE]: (state, action) => {
        return {
            ...state,
            timelines: action.payload
        }
    },

    [GET_TIMELINE_LOAD]: (state, action) => {
        return {
            ...state,
            timelines: [...state.timelines, ...action.payload]
        }
    },

    [GET_TIMELINE_NEXT] : (state, action) => {
        return {
            ...state,
            nextPage: action.payload
        }
    },

    [GET_TIMELINE_TOTAL] : (state, action) => {
        return {
            ...state,
            totalCount: action.payload
        }
    }
}, initialState);