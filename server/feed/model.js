const connection = require("../db").getDb();


function showEventFeed() {

  return new Promise((resolve, reject) => {
    const query =
      `select itemID,events.userid,subject,descrip,category,likes,latitude,longitude, username as owner from events join users on events.userid = users.userID`; //WHERE userID != ?

    connection.query(query,(error, results)=>{
      if (error){
        console.log("model query error");
        reject(error)
      } else {

        resolve(results);
      }
    });

  });
}

function listOwnEvents(userID) {

  console.log(userID);
  return new Promise((resolve, reject) => {
    console.log(userID+"!!!!!");

    const query =
      `SELECT * from events
       WHERE userID = ?`;

    connection.query(query,[userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function createEvent(event,userID) {

  return new Promise((resolve, reject) => {

    const query =
      `INSERT INTO events (userID,subject,descrip,category,likes,latitude,longitude) VALUES (?,?,?,?,?,?,?)`;

    connection.query(query,[event.userID,event.subject,event.descrip,event.category,0,event.latitude,event.longitude],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(listOwnEvents(userID));
      }
    });

  });
}


function deleteEvent(eventID) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM events WHERE itemID = ?';
    connection.query(query,[eventID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve();
      }
    });
  });
}

function updateEvent(event, userID) {
  return new Promise((resolve, reject) => {

    const query =
      'UPDATE events SET subject = ?,descrip = ?,category = ? WHERE itemID = ? AND userID = ? ';
    connection.query(query,[event.subject, event.descrip, event.category, event.eventID,userID], (error, results) => {
        if (error) {
          console.log("error"),
          reject(error);
        } else {
          resolve(showEventFeed(userID));
        }
      },
    );
  });
}
function updateLikes(likes, eventID) {
  return new Promise((resolve, reject) => {

    const query =
      'UPDATE events SET likes = ? WHERE itemID = ? ';
    connection.query(query,[likes,eventID], (error, results) => {
        if (error) {
          console.log("error"),
            reject(error);
        } else {
          resolve(showEventFeed());
        }
      },
    );
  });
}


module.exports = {
  showEventFeed,
  listOwnEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  updateLikes
};
