/* eslint-disable indent */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable eol-last */
/* eslint-disable object-curly-spacing */
const admin = require("firebase-admin");
//const serviceAccount = require("/Users/saragaya/Downloads/pocket-rn-assignment-8be6b-firebase-adminsdk-lhdbb-1e4fb13684.json");

admin.initializeApp();

const fireDatabase = admin.firestore();

module.exports = { admin, fireDatabase };