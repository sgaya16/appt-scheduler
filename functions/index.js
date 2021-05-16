/* eslint-disable object-curly-spacing */
/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable quotes */
/* eslint-disable no-multiple-empty-lines */

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require("firebase-functions");
// The Firebase Admin SDK to access Firestore.
const express = require("express");
const auth = require("./util/auth.js");
const app = express();

const { getAppointment, getAllAppointmentsByRequester, getAllAppointmentsByApprover, getAllApprovedAppointments, postAppointment, deleteAppointment, updateAppointment } = require("./API/schedule.js");
const { loginUser, signUpUser, getUserInfo, getUserFromName, getUserFromEmail, updateUserInfo } = require("./API/users.js");

//routes for appointments API
app.get("/appts", auth, getAllAppointmentsByRequester);
app.get("/appts/approve", auth, getAllAppointmentsByApprover);
app.get("/approved", auth, getAllApprovedAppointments);
app.get("/appt/:apptId", auth, getAppointment);
app.post("/newappt", auth, postAppointment);
app.delete("/appt/:apptId", auth, deleteAppointment);
app.put("/appt/:apptId", auth, updateAppointment);

//routes for users API
app.post("/login", loginUser);
app.post("/signup", signUpUser);
app.get("/user", auth, getUserInfo);
app.get("/user/:userName", auth, getUserFromName);
app.get("/user/:userEmail", auth, getUserFromEmail);
app.put("/user", auth, updateUserInfo);


//express paths will start from baseurl/api 
exports.api = functions.https.onRequest(app);
