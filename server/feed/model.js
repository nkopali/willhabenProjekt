const connection = require("../db").getDb();


function showEventFeed(userId) {

  return new Promise((resolve, reject) => {

    const query =
      `SELECT * from events
       WHERE userID != ?`;

    connection.query(query,[userId],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function listOwnEvents(userId) {

  return new Promise((resolve, reject) => {

    const query =
      `SELECT * from events
       WHERE userID = ?`;

    connection.query(query,[userId],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(results);
      }
    });

  });
}

function createEvent(userId,event) {

  return new Promise((resolve, reject) => {

    const query =
      `INSERT INTO events (userID,subject,descrip,category,latitude,longitude) VALUES (?,?,?,?,?,?)`;

    connection.query(query,[event.userID,event.subject,event.descrip,event.category,event.latitude,event.longitude],(error, results)=>{
      if (error){
        reject(error)
      } else {
        resolve(listOwnEvents(userId));
      }
    });

  });
}
module.exports = {
  showEventFeed,
  listOwnEvents,
  createEvent
};
