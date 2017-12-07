const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp(functions.config().firebase);


exports.changeUserName = functions.https.onRequest((req, res) => {
  console.log('Debug: [' + req.method + '] Query:', req.query);
  
  cors(req,res, () => {
    changeUserName(req, res);
  });
});

exports.changeUserNameEvent = functions.database.ref('/users/{userID}/name').onUpdate(event =>{
    let eventSnapshot = event.data;
    let userID = event.params.userID;
    let newValue = eventSnapshot.val();
    
    let previousValue = eventSnapshot.previous.exists() ? eventSnapshot.previous.val() : '';
    
    console.log(`[changeUserNameEvent] ${userID} |from: ${previousValue} to: ${newValue}`);
    
    let userReviews = eventSnapshot.ref.root.child(`/users/${userID}/reviews/`);
    let updateTask = userReviews.once('value', snap => {
        let reviewIDs = Object.keys(snap.val());
        
        let updates = {};
        reviewIDs.forEach(key => {
            updates[`/reviews/${key}/ownerName`] = newValue;
        });
        
        return eventSnapshot.ref.root.update(updates);
    });
    
    return updateTask;
});


function changeUserName(req, res){
    if(req.method != 'POST'){
        res.status(400).send("It's a POST function");
        return;
    }
    
    if( req.query.id === undefined || req.query.newName === undefined){
        res.status(400).send('Missing params');
        return;
    }
    
    res.send({status: 'ok', msg: 'Updated!'});
}