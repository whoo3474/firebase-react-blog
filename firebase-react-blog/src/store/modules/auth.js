import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type
const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS';
const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
const AUTH_SIGN_CHECK = 'AUTH_SIGN_CHECK';
const CREATE_AUTH_EMAIL_SUCCESS = 'CREATE_AUTH_EMAIL_SUCCESS';
const CREATE_AUTH_EMAIL_ERROR = 'CREATE_AUTH_EMAIL_ERROR';

// action creators
const authSignInSuccess = createAction(AUTH_SIGN_IN_SUCCESS);
const authSignInError = createAction(AUTH_SIGN_IN_ERROR);
const authSignOutSuccess = createAction(AUTH_SIGN_OUT_SUCCESS);
const authSignCheck = createAction(AUTH_SIGN_CHECK);
const createAuthEmailSuccess = createAction(CREATE_AUTH_EMAIL_SUCCESS);
const createAuthEmailError = createAction(CREATE_AUTH_EMAIL_ERROR);

//email,password 아이디 비밀번호로 생성
export const createAuthEmailTk = (newUser) => {
    return (dispatch, getState) => {
        console.log('newUser',newUser);
        const firestore = fbConfig.firestore();
        fbConfig.auth().createUserWithEmailAndPassword(newUser.email,newUser.password).then((response)=>{
            console.log('response',response);
            return firestore.collection('users').doc(response.user.uid).set({
                name : newUser.name
            })
        }).then(()=>{
            dispatch(createAuthEmailSuccess());
        }).catch((error) => {
            dispatch(createAuthEmailError(error));
        });
    }
}
//email,password 인증
export const authSignInTk = (user) => {
    const {email,password} = user;
    return (dispatch, getState) =>{
        fbConfig.auth().signInWithEmailAndPassword(email, password).then((a)=>{
            dispatch(authSignInSuccess());
        }).catch((err)=>{
            dispatch(authSignInError(err));
        });
    }
}
//email,password 로그아웃
export const authSignOutTk = () => {
    return (dispatch, getState) =>{
        fbConfig.auth().signOut().then((a)=>{
            dispatch(authSignOutSuccess())}
        );
    }
}

export const authCheckTk = () => {
    return (dispatch,getState) => {
        fbConfig.auth().onAuthStateChanged(user => {
            dispatch(authSignCheck(user))
        })
    }
}

const initialState = {
    userId:'',
    redirect:false,
    authError:'',
    message:''
}

export default handleActions({
    [AUTH_SIGN_IN_SUCCESS]: (state, action) => {
        return {
            ...state,
            authError: '',
            isSignedIn:true
        }
    },
    [AUTH_SIGN_IN_ERROR]: (state, action) => {
        return {
            ...state,
            authError: 'Login failed'
        }
    },

    [AUTH_SIGN_OUT_SUCCESS]: (state, action) => {
        return {
            ...state,
            isSignedIn:false,
            redirect:true
        }
    },

    [AUTH_SIGN_CHECK]: (state, action) => {
        return {
            ...state,
            isSignedIn:!!action.payload,
            user:action.payload
        }
    },
    [CREATE_AUTH_EMAIL_SUCCESS]: (state, action) => {
        return {
            ...state,
            authError:''
        }
    },
    [CREATE_AUTH_EMAIL_ERROR]: (state, action) => {
        return {
            ...state,
            authError:action.payload
        }
    }
},initialState);