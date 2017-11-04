const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


exports.notifyUser = functions.firestore
    .document('messages/{messageId}')
    .onCreate(event => {
        
    const message = event.data.data();
    const userId = message.recipientId

    // Message details for end user
    const payload = {
        notification: {
            title: 'New message!',
            body: `${message.senderId} sent you a new message`,
            icon: 'https://goo.gl/Fz9nrQ'
          }
    }

    // ref to the parent document
    const db = admin.firestore()
    const userRef = db.collection('users').doc(userId)


    // get users tokens and send notifications
    return userRef.get()
        .then(snapshot => snapshot.data() )
        .then(user => {
            
            const tokens = user.fcmTokens ? Object.keys(user.fcmTokens) : []

            if (!tokens.length) {
               throw new Error('User does not have any tokens!')
            }

            return admin.messaging().sendToDevice(tokens, payload)
        })
        .catch(err => console.log(err) )
});
