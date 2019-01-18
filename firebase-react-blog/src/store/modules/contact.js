import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';


// action type
const GET_CONTACT = 'GET_CONTACT';
const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
const CREATE_CONTACT = 'CREATE_CONTACT';
const CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR';

// action creators
const getContact = createAction(GET_CONTACT);
const getContactList = createAction(GET_CONTACT_LIST);
const createContact = createAction(CREATE_CONTACT);
const createContactError = createAction(CREATE_CONTACT_ERROR);

export const getContactListTk = () => {
    return (dispatch, getState)=>{
        fbConfig.collection('contacts').get()
        .then((querySnapshot)=> {
            var rows = []; 
            console.log(querySnapshot);
            querySnapshot.forEach((doc) => { 
                console.log(doc);
                var childData = doc.data(); 
                rows.push(childData);
            });
           dispatch(getContactList(rows));
        });
    };
};

export const getContactTk = (id) => {
    return (dispatch, getState)=>{
        fbConfig.collection('contacts').doc(id).get()
        .then((querySnapshot)=>
            dispatch(getContact(querySnapshot.data()))
        );
    };
};


export const createContactTk = (contact) => {
    return (dispatch, getState) => {
        const contactDoc = fbConfig.collection('contacts').doc();
        contactDoc.set({
            ...contact,
            id:contactDoc.id,
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
    contactList:[],
    contact:{}
}

// reducer
export default handleActions({
    [GET_CONTACT_LIST] : (state,action) => {
        return {
            ...state,
            contactList: action.payload
        }
    },
    [GET_CONTACT] : (state,action) => {
        return {
            contact: action.payload
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