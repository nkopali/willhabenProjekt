const model = require('./model');
const jwt = require('jsonwebtoken');

//Sends all foreign events to the client
function showEventFeed(request, response) {
  model.showEventFeed(request.userId).then(
    events => {
      if(events.length < 1){
        response.status(200).json({message:"No events found"});
      }
      else{
        response.status(200).json(events);
      }
    },
    error => response.send(error),

  );
}

function listOwnEvents(request, response) {
  model.getFeed(request.userId).then(
    events => {
      if(events.length < 1){
        response.status(200).json({message:"No events found"});
      }
      else{
        response.status(200).json(events);
      }
    },
    error => response.send(error),

  );
}

function createEvent(request, response) {

  const event = {
    userID : request.body.userId,
    subject : request.body.subject,
    descrip : request.body.descrip,
    category : request.body.category,
    latitude : request.body.latitude,
    longitude : request.body.longitude

  };


  model.createEvent (event, request.userId).then(
    event => response.status(200).json(event),
    error => response.status(500).json(error),
  );
}

function deleteEvent (request,response){

  const eventID = request.body.eventID;


  model.deleteEvent(eventID,request.userId).then(
    results => {
      response.status(200).json(results);
    },
    error => response.send(error),
  );

}





module.exports = {
  showEventFeed,
  listOwnEvents,
  createEvent,
  deleteEvent,

};
