const model = require('./model');
const jwt = require('jsonwebtoken');

//Sends all foreign events to the client
function showEventFeed(request, response) {
  model.showEventFeed(request.body.userID).then(
console.log("conroller"+request.body.userID),
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
  model.listOwnEvents(request.body.userID).then(
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
    userID : request.body.userID,
    subject : request.body.subject,
    descrip : request.body.descrip,
    category : request.body.category,
    latitude : request.body.latitude,
    longitude : request.body.longitude

  };


  model.createEvent (event, request.body.userID).then(
    event => response.status(200).json(event),
    error => response.status(500).json(error),
  );
}

function deleteEvent (request,response){

  model.deleteEvent(request.body.eventID,request.body.userID).then(
    results => {
      response.status(200).json(results);
    },
    error => response.send(error),
  );

}

function updateEvent(request, response) {
  const event = {
    eventID : request.body.eventID,
    subject : request.body.subject,
    descrip : request.body.descrip,
    category : request.body.category,
    latitude : request.body.latitude,
    longitude : request.body.longitude

  };
  model.updateEvent(event,request.body.userID)(
    event => response.status(200).json(event),
    error => response.status(500).json(error),
  );
}




module.exports = {
  showEventFeed,
  listOwnEvents,
  createEvent,
  deleteEvent,
  updateEvent
};
