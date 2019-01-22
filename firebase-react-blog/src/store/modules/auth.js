import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type
const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS';
const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
const AUTH_SIGN_CHECK_OK = 'AUTH_SIGN_CHECK_OK';
const AUTH_SIGN_CHECK_NO = 'AUTH_SIGN_CHECK_NO';
const CREATE_AUTH_EMAIL_SUCCESS = 'CREATE_AUTH_EMAIL_SUCCESS';
const CREATE_AUTH_EMAIL_ERROR = 'CREATE_AUTH_EMAIL_ERROR';
const GET_USER_INFO = 'GET_USER_INFO';

// action creators
const authSignInSuccess = createAction(AUTH_SIGN_IN_SUCCESS);
const authSignInError = createAction(AUTH_SIGN_IN_ERROR);
const authSignOutSuccess = createAction(AUTH_SIGN_OUT_SUCCESS);
const authSignCheckOk = createAction(AUTH_SIGN_CHECK_OK);
const authSignCheckNo = createAction(AUTH_SIGN_CHECK_NO);
const createAuthEmailSuccess = createAction(CREATE_AUTH_EMAIL_SUCCESS);
const createAuthEmailError = createAction(CREATE_AUTH_EMAIL_ERROR);
const getUserInfo = createAction(GET_USER_INFO);

export const getUserInfoTk = (user) => {
    return (dispatch, getState) => {
        console.log('info',fbConfig.auth());
    }
}

//email,password 아이디 비밀번호로 생성
export const createAuthEmailTk = (newUser) => {
    return (dispatch, getState) => {
        const firestore = fbConfig.firestore();
        fbConfig.auth().createUserWithEmailAndPassword(newUser.email,newUser.password).then((response)=>{
            // firebase auth 에서 이메일로 유저를 만들때 사용, 프로미스 반환
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
            // firebase auth 에서 이메일로 유저를 인증할때 사용, 프로미스 반환
            dispatch(authSignInSuccess(a.user));
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
            // firebase auth 에서 인증상태를 감시하기 위하여 사용, 인증 상태가 변경될때마다 작용, 로그인 또는 로그아웃시
            if(user){
                dispatch(authSignCheckOk(user));
            }else{
                dispatch(authSignCheckNo());
            }
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
            isSignedIn:false,
            authError: action.payload.message
        }
    },

    [AUTH_SIGN_OUT_SUCCESS]: (state, action) => {
        return {
            ...state,
            isSignedIn:false,
            redirect:true
        }
    },

    [AUTH_SIGN_CHECK_OK]: (state, action) => {
        return {
            ...state,
            isSignedIn:true,
            user:action.payload
        }
    },
    [AUTH_SIGN_CHECK_NO]: (state, action) => {
        return {
            ...state,
            isSignedIn:false,
            user:''
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
            authError:action.payload.message
        }
    }
},initialState);