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
