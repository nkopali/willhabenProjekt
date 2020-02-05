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
      `INSERT INTO messages (senderID,receiverID,text,timestamp) VALUES (?,?,?,?)`;

    connection.query(query,[msg.senderID,msg.receiverID,msg.text,msg.timestamp],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(showMsgs(msg.senderID));
      }
    });

  });
}


function deleteMsg(msgID, userID) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM messages WHERE msgID = ? AND senderID = -1;';
    connection.query(query,[msgID,userID,userID],(error, results)=>{
      if (error){
        reject(error)
      } else if (results.affectedRows === 0){

        return new Promise((resolve, reject) => {
          const query =
            'update messages set senderID = -1 where msgID = ?;';
          connection.query(query,[msgID],(error, results)=>{
            if (error){
              reject(error)}
             else {
                resolve(showMsgs(userID));
            }
          });
        });

      } else {
        resolve(showMsgs(userID));
      }
    });
  });
}


module.exports = {
  showMsgs,
  sendMsg,
  deleteMsg,
};
