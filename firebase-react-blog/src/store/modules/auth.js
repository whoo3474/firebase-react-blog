import { createAction, handleActions } from 'redux-actions';
import fbConfig from '../../config/fbConfig';

// action type
const AUTH_SIGN_IN_SUCCESS = 'AUTH_SIGN_IN_SUCCESS';
const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
const CREATE_AUTH_EMAIL = 'CREATE_AUTH_EMAIL';

// action creators
const authSignInSuccess = createAction(AUTH_SIGN_IN_SUCCESS);
const authSignInError = createAction(AUTH_SIGN_IN_ERROR);
const authSignOut = createAction(AUTH_SIGN_OUT);
const createAuthEmail = createAction(CREATE_AUTH_EMAIL);

//email,password 아이디 비밀번호로 생성
export const createAuthEmailTk = ({email,password}) => {
    return (dispatch, getState) => {
        console.log(email,password);
        fbConfig.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
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
        fbConfig.auth().signInWithEmailAndPassword(email, password).then(()=>{
            dispatch(authSignInSuccess());
        }).catch((err)=>{
            dispatch(authSignInError(err));
        });
    }
}
//email,password 로그아웃
export const authSignOutTk = () => {
    return (dispatch, getState) =>{
        fbConfig.auth().signOut();
        dispatch(authSignOut());
    }
}

const initialState = {
    userId:'',
    isSignedIn:false,
    redirect:false,
    message:''
}

export default handleActions({
    [AUTH_SIGN_IN_SUCCESS]: (state, action) => {
        return {
            ...state,
            isSignedIn:true
        }
    },
    [AUTH_SIGN_OUT]: (state, action) => {
        return {
            ...state,
            isSignedIn:false,
            redirect:true
        }
    },
    [CREATE_AUTH_EMAIL]: (state, action) => {
        return {
            ...state,
            message:action.payload
        }
    }
},initialState);