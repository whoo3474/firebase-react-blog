import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';


// action type
const GET_CONTACT = 'GET_CONTACT';
const CREATE_CONTACT = 'CREATE_CONTACT';
const CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR';

// action creators
const getContact = createAction(GET_CONTACT);
const createContact = createAction(CREATE_CONTACT);
const createContactError = createAction(CREATE_CONTACT_ERROR);

export const getContactTk = () => {
    return (dispatch, getState)=>{
        fbConfig.collection('contacts').get()
        .then((querySnapshot)=> {
            var rows = []; 
            querySnapshot.forEach((doc) => { 
                var childData = doc.data(); 
                rows.push(childData);
            });
           dispatch(getContact(rows));
        });
    };
};

export const createContactTk = (contact) => {
    return (dispatch, getState) => {
        fbConfig.collection('contacts').add({
            ...contact,
            authorName: 'minhan',
            authorId:12345,
            createdAt: new Date()
        }).then(() => {
            dispatch(createContact(contact));
        }).catch((err) => {
            dispatch(createContactError(err));
        })
    } 
};

// initial state
const initialState = {
    contacts:[]
}

// reducer
export default handleActions({
    [GET_CONTACT] : (state,action) => {
        return {
            ...state,
            contacts: action.payload
        }
    },
    [CREATE_CONTACT] : (state,action) => {
        return {
            state
        }
    },
    [CREATE_CONTACT_ERROR] : (state,action) => {
        return {
            state
        }
    }
}, initialState);