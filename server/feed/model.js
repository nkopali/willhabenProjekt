const connection = require("../db").getDb();


function showEventFeed() {

  return new Promise((resolve, reject) => {
    const query =
      `SELECT * from events`; //WHERE userID != ?

    connection.query(query,(error, results)=>{
      if (error){

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
      `INSERT INTO events (userID,username,subject,descrip,category,latitude,longitude) VALUES (?,?,?,?,?,?)`;

    connection.query(query,[event.username,event.userID,event.subject,event.descrip,event.category,event.latitude,event.longitude],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(listOwnEvents(userID));
      }
    });

  });
}


function deleteEvent(eventID, userID) {
  return new Promise((resolve, reject) => {
    const query =
      'DELETE FROM events WHERE eventID = ? AND userID = ? ';
    connection.query(query,[eventID,userID],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(listOwnEvents(userID));
      }
    });
  });
}

function updateEvent(event, userID) {
  return new Promise((resolve, reject) => {

    const query =
      'UPDATE events SET username = ?,subject = ?,descrip = ?,category = ?,latitude = ?,longitude = ?  WHERE eventID = ? AND userID = ? ';
    connection.query(query,[event.username,event.subject, event.descrip, event.category, event.latitude, event.longitude, event.eventID,userID], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(showEventFeed(userID));
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
  updateEvent
};
