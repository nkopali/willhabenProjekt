const model = require('./model');

//Sends all foreign events to the client
function showEventFeed(request, response) {

  model.showEventFeed().then(
      events => {
      if(events.length < 1){
        response.status(200).json([]);
      }
      else{
        response.status(200).json(events);
      }
    },
    error => response.send(error),

  );
}

function listOwnEvents(request, response) {
  model.listOwnEvents(request.params.id).then(

    events => {
      if(events.length < 1){
        console.log("controller"+JSON.stringify(events)+"error");

        response.status(200).json([]);
      }
      else{
        console.log("controller"+JSON.stringify(events)+"success");


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

  model.deleteEvent(request.params.id).then(
    results => {
      response.status(200).json(results);
    },
    error => response.send(error),
  );

}

function updateEvent (request, response) {
  const event = {
    eventID : request.body.eventID,
    subject : request.body.subject,
    descrip : request.body.descrip,
    category : request.body.category

  };
  model.updateEvent(event,request.body.userID).then(
    event => response.status(200).json(event),
    error => response.status(500).json(error),
  );
}

function updateLikes (request, response) {

  model.updateLikes(request.body.likes,request.body.eventID).then(
    event => response.status(200).json(event),
    error => response.status(500).json(error),
  );
}





module.exports = {
  showEventFeed,
  listOwnEvents,
  createEvent,
  deleteEvent,
  updateEvent,
  updateLikes
};
