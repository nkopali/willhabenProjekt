const connection = require("../db").getDb();


function showMsgs(userID) {

  return new Promise((resolve, reject) => {

    const query =
      `SELECT * from messages
       WHERE (senderID = ? AND senderstatus = 0) OR (receiverID = ? AND receiverstatus = 0) `;

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
      'select * from messages where msgID = ?';
    connection.query(query,[msgID],(error, results)=>{
      if (error){
        reject(error)
      }
      else {
        resolve(results);
      }
    });

  }).then(results => {

    if (results[0].senderID == userID && results[0].senderstatus == 0) {
        return new Promise((resolve, reject) => {
          const query =
            'UPDATE messages SET senderstatus = 1 where msgID = ?';
          connection.query(query,[msgID],(error, results)=>{
            if (error){
              reject(error)
            }else {
              resolve(showMsgs(userID));
            }
          });
        });
  }else if (results[0].receiverID == userID && results[0].receiverstatus == 0) {
        return new Promise((resolve, reject) => {
          const query =
            'UPDATE messages SET receiverstatus = 1 where msgID = ?';
          connection.query(query,[msgID],(error, results)=>{
            if (error){
              reject(error)
            }else {
              resolve(showMsgs(userID));
            }
          });
        });
      }else {
        return new Promise((resolve, reject) => {
          const query =
            'DELETE from  messages where msgID = ?';
          connection.query(query,[msgID],(error, results)=>{
            if (error){
              reject(error)
            }else {
              resolve(showMsgs(userID));
            }
          });
        });
      }
  });
}



module.exports = {
  showMsgs,
  sendMsg,
  deleteMsg,
};

