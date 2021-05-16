/* eslint-disable semi */
/* eslint-disable padded-blocks */
/* eslint-disable quotes */
/* eslint-disable no-tabs */
/* eslint-disable brace-style */
/* eslint-disable max-len */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-spacing */
/* eslint-disable eol-last */
const { admin, fireDatabase } = require("./admin.js");

module.exports = (req, res, next) => {
    let idToken;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    }
    else {
        console.error("No token found");
		return res.status(403).json({ error: "Unauthorized" });
    }

    admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
        req.user = decodedToken;
        return fireDatabase
                .collection(`users`)
                .where("userId", "==", req.user.uid)
                .limit(1)
                .get()
    })
    .then((data) => {
        req.user.firstName = data.docs[0].data().firstName;
        return next();
    })
    .catch((err) => {
        console.error('Error while verifying token', err);
		return res.status(403).json(err);
    });
};