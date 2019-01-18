import { createAction, handleActions } from 'redux-actions';

// action type
const GET_AUTH = 'GET_AUTH';

// action creators
const getAuth = createAction(GET_AUTH);

const initialState = {

}

export default handleActions({
    [GET_AUTH]: (state, action) => {
        return {
            ...state
        }
    }
},initialState);