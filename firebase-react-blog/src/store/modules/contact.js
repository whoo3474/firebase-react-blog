import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';


// action type
const GET_CONTACT = 'GET_CONTACT';
const CREATE_CONTACT = 'CREATE_CONTACT';

// action creators
const getContact = createAction(GET_CONTACT);
const createContact = createAction(CREATE_CONTACT);

export const createContactTk = (contact) => {
    return (dispatch, getState) => {
        dispatch(createContact(contact));
    }
};

// initial state
const initialState = {
    contacts:[
        { id:'1', title:'Project Title', content:'Project text' }
    ]
}

// reducer
export default handleActions({
    [GET_CONTACT] : (state,action) => {
        return {
            state
        }
    },
    [CREATE_CONTACT] : (state,action) => {
        return {
            state
        }
    }
}, initialState);