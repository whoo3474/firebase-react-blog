import { createAction, handleActions } from 'redux-actions';
import fbConfig,{fireStore} from '../../config/fbConfig';


// action type
const GET_CONTACT = 'GET_CONTACT';
const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
const GET_CONTACT_LIST_LOAD = 'GET_CONTACT_LIST_LOAD';
const CREATE_CONTACT = 'CREATE_CONTACT';
const CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR';
const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';

// action creators
const getContact = createAction(GET_CONTACT);
const getContactList = createAction(GET_CONTACT_LIST);
const getContactListLoad = createAction(GET_CONTACT_LIST_LOAD);
const createContact = createAction(CREATE_CONTACT);
const createContactError = createAction(CREATE_CONTACT_ERROR);
const getNotifications = createAction(GET_NOTIFICATIONS);

export const getContactListTk = () => {
    return (dispatch, getState)=>{
        const state = getState().contact;
        const lastBoard = state.lastBoard;
        const countList = state.countList;
        const exists = state.exists;
        const rows = []; 

        const fireStorage =fbConfig.storage();
        let ContactListFirst =fbConfig.firestore().collection('contacts').orderBy('createdAt');
        if(!!exists){
            if(!!lastBoard){
                // lastBoard가 있다고? 그럼 startAfter로 너를 기준으로 limit만큼 찾아오자
                ContactListFirst.startAfter(lastBoard).limit(countList).get().then((querySnapshot)=> {
                    querySnapshot.forEach((doc) => {
                        // 게시판을 for문으로 다 뽑을껀데 
                        let childData = doc.data(); 
                        if(!!childData.filePath) {
                            //  혹시 file 있니?
                            fireStorage.ref().child(doc.data().filePath).getDownloadURL().then( url =>{
                            childData.DownloadUrl= url;
                            // 있으면 같이 store에 DownloadUrl로 저장 되렴
                            })
                        }
                        rows.push(childData);
                    });
                    const lastBoard = querySnapshot.docs[querySnapshot.docs.length-1];
                   dispatch(getContactList(rows));
                   dispatch(getContactListLoad(lastBoard));
                });
            }else{
                // 여긴 처음부터 시작하자. 첫시작은 너야
                ContactListFirst.limit(countList).get().then((querySnapshot)=> {
                    querySnapshot.forEach((doc) => {
                        // 게시판을 for문으로 다 뽑을껀데 
                        let childData = doc.data(); 
                        if(!!childData.filePath) {
                            //  혹시 file 있니?
                            fireStorage.ref().child(doc.data().filePath).getDownloadURL().then( url =>{
                            childData.DownloadUrl= url;
                            // 있으면 같이 store에 DownloadUrl로 저장 되렴
                            })
                        }
                        rows.push(childData);
                    });
                    const lastBoard = querySnapshot.docs[querySnapshot.docs.length-1];
                   dispatch(getContactList(rows));
                   dispatch(getContactListLoad(lastBoard));
                });
            }
        }

    };
};

export const getNotificationsTk = () => {
    return (dispatch, getState)=>{
        fbConfig.firestore().collection('notifications').orderBy('time','desc').limit(3).get()
        .then((querySnapshot)=> {
            let rows = []; 
            querySnapshot.forEach((doc) => { 
                let childData = doc.data(); 
                rows.push(childData);
            });
           dispatch(getNotifications(rows));
        });
    };
};

export const getContactTk = (id) => {
    return (dispatch, getState)=>{
        fbConfig.firestore().collection('contacts').doc(id).get()
        .then((querySnapshot)=>
            dispatch(getContact(querySnapshot.data()))
        );
    };
};


export const createContactTk = (contact) => {
    return (dispatch, getState) => {
        const firestore = fireStore.collection('contacts').doc();
        const firebaseUser = fbConfig.auth().currentUser;
        const Time = new Date();
        const fireStorage =fbConfig.storage().ref().child(`blog_img/${Time}`);
        // const DownloadUrl = fireStorage.getDownloadURL()
        if(contact.file){
            fireStorage.put(contact.file).then((snapshot)=> {
                firestore.set({
                    ...contact,
                    id:firestore.id,
                    file: contact.file.name||'',
                    changeFileName : Time.getTime(),
                    authorName: firebaseUser.displayName||'이름없음',
                    authorId:firebaseUser.email||'이메일없음',
                    // filePath: snapshot.get||'',
                    filePath: snapshot.metadata.fullPath||'',
                    createdAt:Time
                }).then(() => {
                dispatch(createContact(contact));
                    // 스토리지에 저장
                }).catch((err) => {
                    dispatch(createContactError(err));
                    })
                });
        }
        else{
            firestore.set({
                ...contact,
                id:firestore.id,
                file: '',
                changeFileName : '',
                authorName: firebaseUser.displayName||'이름없음',
                authorId:firebaseUser.email||'이메일없음',
                filePath: ''
            }).then(() => {
            dispatch(createContact(contact));
                // 스토리지에 저장
            }).catch((err) => {
                dispatch(createContactError(err));
                })
        }
            // 얘를 async/ await로 바꿔서 해보자
    } 
};

// initial state
const initialState = {
    contactList:[],
    contact:{},
    notifications:[],
    lastBoard:'',
    // 마지막 인덱스
    exists:true,
    countList:4,
    //한페이지에 출력될 게시물 수
}

// reducer
export default handleActions({
    [GET_CONTACT_LIST] : (state,action) => {
        return {
            ...state,
            loading:false,
            contactList: [...state.contactList,...action.payload]
        }
    },
        [GET_CONTACT_LIST_LOAD] : (state,action) => {
        return {
            ...state,
            loading:false,
            lastBoard:action.payload,
            exists: action.payload?(action.payload.exists?action.payload.exists:''):''
        }
    },
    [GET_CONTACT] : (state,action) => {
        return {
            ...state,
            contact: action.payload
        }
    },
    [CREATE_CONTACT] : (state,action) => {
        return {
            ...state,
            contactList:[...state.contactList,action.payload]
        }
    },
    [CREATE_CONTACT_ERROR] : (state,action) => {
        return {
            ...state
        }
    },
    [GET_NOTIFICATIONS] : (state,action) => {
        return {
            ...state,
            notifications: action.payload
        }
    }
}, initialState);