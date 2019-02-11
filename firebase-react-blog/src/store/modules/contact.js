import { createAction, handleActions } from 'redux-actions';
import fbConfig,{fireStore} from '../../config/fbConfig';
import { componentFromStreamWithConfig } from 'recompose';


// action type
const GET_CONTACT = 'GET_CONTACT';
const GET_CONTACT_LIST = 'GET_CONTACT_LIST';
const GET_CONTACT_LIST_LOAD = 'GET_CONTACT_LIST_LOAD';
const CREATE_CONTACT = 'CREATE_CONTACT';
const CREATE_CONTACT_ERROR = 'CREATE_CONTACT_ERROR';
const GET_NOTIFICATIONS = 'GET_NOTIFICATIONS';
const DELETE_CONTACT = 'DELETE_CONTACT';
const DELETE_CONTACT_ERROR = 'DELETE_CONTACT_ERROR';

// action creators
const getContact = createAction(GET_CONTACT);
const getContactList = createAction(GET_CONTACT_LIST);
const getContactListLoad = createAction(GET_CONTACT_LIST_LOAD);
const createContact = createAction(CREATE_CONTACT);
const createContactError = createAction(CREATE_CONTACT_ERROR);
const getNotifications = createAction(GET_NOTIFICATIONS);
const deleteContact = createAction(DELETE_CONTACT);
const deleteContactError = createAction(DELETE_CONTACT_ERROR);

export const deleteContactTk= (id) => {
    return (dispatch, getState) => {
        const userEmail = getState().auth.user.email;
        const contactAuthorId = getState().contact.contact.authorId;
        if(userEmail==contactAuthorId){
            fbConfig.firestore().collection('contacts').doc(id).delete()
            .then(()=>{
                const List = getState().contact.contactList.filter((contact)=>{
                    return contact.id !== id
                })
                // id받아와서, 얘 아닌거만 필터로 골라서 ContactList로 만들어준다.
                // 현재 리덕스의 store에서 값을 읽어서 Contact 페이지로 뿌려주는것이라
                // 안해주면 지웠어도 새로고침 하기전까지 남아있음
                dispatch(deleteContact(List))
            }).catch((err)=>{
                dispatch(deleteContactError())
            })
        }else{
            dispatch(deleteContactError())
        }
    }
}

export const getContactTk = (id) => {
    return (dispatch, getState)=>{
        const contactFind = getState().contact.contactList.find((n)=>{
            return n.id===id
        })
            dispatch(getContact(contactFind));
    };
};


export const getContactListTk = () => {
    return (dispatch, getState)=>{
        const state = getState().contact;
        const lastBoard = state.lastBoard;
        const countList = state.countList;
        const exists = state.exists;
        const rows = []; 

        const fireStorage =fbConfig.storage();
        let ContactListFirst =fbConfig.firestore().collection('contacts').orderBy('createdAt','desc');
        if(!!exists){
            if(!!lastBoard){
                // lastBoard가 있다고? 그럼 startAfter로 너를 기준으로 limit만큼 찾아오자
                ContactListFirst.startAfter(lastBoard).limit(countList).get().then((querySnapshot)=> {
                    querySnapshot.forEach((doc) => {
                        // 게시판을 for문으로 다 뽑을껀데 
                        let childData = doc.data(); 
                        if(!!childData.filePath) {
                            //  혹시 file 있니?
                            fireStorage.ref().child(childData.filePath).getDownloadURL().then( url =>{
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


export const createContactTk = (contact) => {
    return (dispatch, getState) => {
        const stateContactList = getState().contact.contactList;
        const firebaseUser = fbConfig.auth().currentUser;
        const Time = new Date();
        let firestore = fireStore.collection('contacts').doc();
        let submitList = contact;
        if(contact.id){
            // 업데이트문을 위한 함수
            firestore = fireStore.collection('contacts').doc(contact.id);
            
            const index = getState().contact.contactList.findIndex(item => item.id === contact.id)
            if( index <= stateContactList.length){
                submitList = [...stateContactList.slice(0,index), contact, ...stateContactList.slice(index+1, stateContactList.length)]
            }
            // firebase와 redux의 state를 따로 수정, 삭제, 저장을 해주어야 하는건가? 맞는 방법인지 모르겠다.
        }
        const fireStorage =fbConfig.storage().ref().child(`blog_img/${Time.getTime()}`);
        if(contact.file){
            fireStorage.put(contact.file).then((snapshot)=> {
                firestore.set({
                    ...contact,
                    id:firestore.id,
                    file: contact.file.name||'',
                    changeFileName : Time.getTime(),
                    authorName: firebaseUser.displayName||'이름없음',
                    authorId:firebaseUser.email||'이메일없음',
                    filePath: snapshot.metadata.fullPath||'',
                    createdAt:Time,
                    contentType:(snapshot.metadata.contentType=='image/png'||snapshot.metadata.contentType=='image/jpeg')?snapshot.metadata.contentType : ''
                    // 저는 png나 jpeg가 아니면 파일을 안열어 주겠습니다.
                }).then(() => {
                    dispatch(createContact(submitList));
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
                filePath: '',
                createdAt:Time
            }).then(() => {
            dispatch(createContact(submitList));
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
    countList:3,
    //한페이지에 출력될 게시물 수
}

// reducer
export default handleActions({
    [GET_CONTACT_LIST] : (state,action) => {
        return {
            ...state,
            loading:false,
            contactList: [...state.contactList,...action.payload],
        }
   
    },
    [GET_CONTACT_LIST_LOAD] : (state,action) => {
        return {
            ...state,
            loading:false,
            lastBoard:action.payload,
            exists: !!action.payload?(!!action.payload.exists?!!action.payload.exists:false):false
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
            contactList:[action.payload,...state.contactList]
        }
    },
    [CREATE_CONTACT_ERROR] : (state,action) => {
        return {
            ...state,
            contact:{}
        }
    },
    [GET_NOTIFICATIONS] : (state,action) => {
        return {
            ...state,
            notifications: action.payload
        }
    },
    [DELETE_CONTACT] : (state,action) => {
        return {
            ...state,
            contactList:[
                ...action.payload
            ],
            message:'해당 게시물을 정상 삭제하였습니다.'
        }
    },
    [DELETE_CONTACT_ERROR] : (state,action) => {
        return {
            ...state,
            message:'글 작성자가 아니면 삭제가 불가능합니다.'
        }
    }
}, initialState);