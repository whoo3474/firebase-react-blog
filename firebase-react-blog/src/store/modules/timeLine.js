import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type

const GET_TIMELINE = 'GET_TIMELINE';

// action creators

const getTimeline = createAction(GET_TIMELINE);

export const getTimeList = () => {
    return (dispatch, getState)=>{
        fbConfig.firestore().collection('Timelines').get()
        .then((querySnapshot)=> {
            var rows = []; 
            querySnapshot.forEach((doc) => { 
                var childData = doc.data(); 
                rows.push(childData);
            });
           dispatch(getTimeline(rows));
        });
    };
};

// initial state
const initialState = {
    timelines: []
};

// reducer
export default handleActions({
    [GET_TIMELINE]: (state, action) => {
        return {
            ...state,
            timelines: action.payload
        }
    }
}, initialState);