const connection = require("../db").getDb();


function showMsgs(userID) {

  return new Promise((resolve, reject) => {

    const query =
      `SELECT * from messages
       WHERE senderID = ? OR receiverID = ?`;

    connection.query(query,[userID,userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function sendMsg(msg,userID) {

  return new Promise((resolve, reject) => {

    const query =
      `INSERT INTO messages (senderID,receiverID,text) VALUES (?,?,?)`;

    connection.query(query,[msg.senderID,msg.receiverID,msg.text],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(showMsgs(userID));
      }
    });

  });
}


function deleteMsg(eventID, userID) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM events WHERE eventID = ? AND userID = ? ';
    connection.query(query,[eventID,userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(showEventFeed(userID));
      }
    });
  });
}


module.exports = {
  showMsgs,
  sendMsg,
  deleteMsg,
};
