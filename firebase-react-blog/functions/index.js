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
            content: '게시글이 새로 추가되었습니다.',
            user : `${contact.authorName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotificatoin(notification);
    })
