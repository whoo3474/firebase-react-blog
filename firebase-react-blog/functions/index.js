const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

const createNotificatoin = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then( doc => console.log('notification 추가',doc));
})

exports.projectCreated = functions.firestore
    .document('contacts/{contactId}')
    .onCreate( doc => {
        const contact = doc.data();
        const notification = {
            content: '님의 새로운 게시글이 추가되었습니다.',
            user : `${contact.authorName}`||'이름없음',
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotificatoin(notification);
    });

exports.userJoined = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
        .doc(user.uid).get().then( doc => {
            const newUser = doc.data();
            const notification = {
                content : '님이 회원가입을 하셨습니다.',
                user: `${newUser.name}`||'이름없음',
                time: admin.firestore.FieldValue.serverTimestamp()
            }
            return createNotificatoin(notification);
        })
});

