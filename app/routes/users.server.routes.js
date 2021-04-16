// Load the 'users' controller
var users = require("../controllers/user.server.controller");
var express = require("express");
var router = express.Router();
// Define the routes module' method
module.exports = function (app) {
  // handle a get request made to /users path
  // and list users when /users link is selected
  app.get("/patients", users.requiresLogin, users.listPatients); //go to http://localhost:3000/users to see the list
  app.route("/vital_signs/:userId").post(users.addVitalSign);
  app.route("/vital_signs").post(users.requiresLogin, users.addUserVitalSign);
  app.route("/daily_tips/:userId").post(users.requiresLogin, users.addDailyTip);
  app
    .route("/emergencies")
    .get(users.requiresLogin, users.getNewEmergencies)
    .put(users.requiresLogin, users.responseEmergency)
    .post(users.requiresLogin, users.addEmergency);
  //handle a post request made to root path
  app.post("/", users.create);
  // Set up the 'users' parameterized routes
  app
    .route("/users/:userId")
    .get(users.read)
    .put(users.update)
    .delete(users.delete);
  app
    .route("/users")
    .get(users.requiresLogin, users.readUser);
  app.route("/usersEmail/:userEmail").get(users.readEmail);

  app.post("/checklistResults", users.checklistResults);

  // Set up the 'userId' parameter middleware
  //All param callbacks will be called before any handler of
  //any route in which the param occurs, and they will each
  //be called only once in a request - response cycle,
  //even if the parameter is matched in multiple routes
  app.param("userId", users.userByID);
  app.param("userEmail", users.userByEmail);
  //authenticate user
  app.post("/signin", users.authenticate);
  app.get("/signout", users.signout);
  app.get("/read_cookie", users.isSignedIn);

  //path to a protected page
  app.get("/welcome", users.welcome);

  //app.route("/messages/:id");
};
