import { createAction, handleActions } from 'redux-actions';
import firestore from '../../config/fbConfig';
// import { Map } from 'immutable';

// action type

const GET_TIMELINE = 'GET_TIMELINE';

// action creators

const getTimeline = createAction(GET_TIMELINE);

export const getTimeList = () => {
    return (dispatch, getState)=>{
        console.log('ccccccc');
        firestore.collection('Timelines').get()
        .then((querySnapshot)=> {
            var rows = []; 
            querySnapshot.forEach((doc) => { 
                var childData = doc.data(); 
                rows.push(childData);
            });
            console.log(rows);
            console.log('ddddd');
           dispatch(getTimeline(rows));
        });
    };
};

// initial state
const initialState = {
    // pending: false,
    // error: false,
    timelines: []
};

// reducer
export default handleActions({
    [GET_TIMELINE]: (state, action) => {
        console.log('aaaaaa');
        console.log(action.payload.data);
        return {
            ...state,
            timelines: action.payload.data
        }
    }
}, initialState);