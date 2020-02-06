const model = require('./model');


function showMsgs(request, response) {
  model.showMsgs(request.params.id).then(
    msgs => {
      if(msgs.length < 1){
        response.status(200).json({message:"No messages found"});
      }
      else{
        response.status(200).json(msgs);
      }
    },
    error => response.send(error),

  );
}

function getAllUsers(request, response) {
  model.getUsers().then(
    users => {
      if(users.length < 1){
        response.status(200).json({message:"No user found"});
      }
      else{
        response.status(200).json(users);
      }
    },
    error => response.send(error),

  );
}


function sendMsg(request, response) {

  const msg = {
    senderID: request.body.senderID,
    receiverID: request.body.receiverID,
    text : request.body.text

  };

  model.sendMsg (msg, request.body.userID).then(
    msg => response.status(200).json(msg),
    error => response.status(500).json(error),
  );
}

function deleteMsg (request,response){

  model.deleteMsg(request.body.msgID,request.body.userID).then(
    results => {
      response.status(200).json(results);
    },
    error => response.send(error),
  );

}




module.exports = {
  showMsgs,
  sendMsg,
  getAllUsers,
  deleteMsg
};
