import { createAction, handleActions } from 'redux-actions';
import { fireAuth } from '../../config/fbConfig';

// action type
const AUTH_SIGN_OUT_SUCCESS = 'AUTH_SIGN_OUT_SUCCESS';
const AUTH_SIGN_CHECK_OK = 'AUTH_SIGN_CHECK_OK';
const AUTH_SIGN_CHECK_NO = 'AUTH_SIGN_CHECK_NO';

// action creators
const authSignOutSuccess = createAction(AUTH_SIGN_OUT_SUCCESS);
const authSignCheckOk = createAction(AUTH_SIGN_CHECK_OK);
const authSignCheckNo = createAction(AUTH_SIGN_CHECK_NO);

export const authSignOutTk = () => {
    return (dispatch, getState) =>{
        fireAuth.signOut().then((a)=>{
            dispatch(authSignOutSuccess())}
        );
    }
}

export const authCheckTk = () => {
    return (dispatch,getState) => {
        fireAuth.onAuthStateChanged(user => {
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
    authError:'',
    message:'',
    isSignedIn:false
}

export default handleActions({
    [AUTH_SIGN_OUT_SUCCESS]: (state, action) => {
        return {
            ...state,
            isSignedIn:false
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
},initialState);