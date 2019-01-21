import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type
const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS';
const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
const AUTH_SIGN_CHECK = 'AUTH_SIGN_CHECK';
const CREATE_AUTH_EMAIL = 'CREATE_AUTH_EMAIL';

// action creators
const authSignInSuccess = createAction(AUTH_SIGN_IN_SUCCESS);
const authSignInError = createAction(AUTH_SIGN_IN_ERROR);
const authSignOutSuccess = createAction(AUTH_SIGN_OUT_SUCCESS);
const authSignCheck = createAction(AUTH_SIGN_CHECK);
const createAuthEmail = createAction(CREATE_AUTH_EMAIL);

//email,password 아이디 비밀번호로 생성
export const createAuthEmailTk = ({email,password}) => {
    return (dispatch, getState) => {
        console.log(email,password);
        fbConfig.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
            console.log(user);
            dispatch(createAuthEmail('가입에 성공하였습니다.'));
        }).catch((error) => {
            dispatch(createAuthEmail('가입에 실패하셨습니다.'));
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
    [CREATE_AUTH_EMAIL]: (state, action) => {
        return {
            ...state,
            message:action.payload
        }
    }
},initialState);