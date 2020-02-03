const connection = require("../db").getDb();


function showEventFeed() {

  return new Promise((resolve, reject) => {
    const query =
      `SELECT * from events
       `; //WHERE userID != ?

    connection.query(query,(error, results)=>{
      if (error){
        console.log("model query error");
        reject(error)
      } else {
        console.log("model query resolve");
        console.log(results.length);
        resolve(results);
      }
    });

  });
}

function listOwnEvents(userID) {

  return new Promise((resolve, reject) => {

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
      `INSERT INTO events (userID,subject,descrip,category,latitude,longitude) VALUES (?,?,?,?,?,?)`;

    connection.query(query,[event.userID,event.subject,event.descrip,event.category,event.latitude,event.longitude],(error, results)=>{
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
        resolve(showEventFeed(userID));
      }
    });
  });
}

function updateEvent(event, userID) {
  return new Promise((resolve, reject) => {

    const query =
      'UPDATE events SET subject = ?,descrip = ?,category = ?,latitude = ?,longitude = ?  WHERE eventID = ? AND userID = ? ';
    connection.query(query,[event.subject, event.descrip, event.category, event.latitude, event.longitude, event.eventID,userID], (error, results) => {
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
