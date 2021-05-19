/* eslint-disable prefer-const */
/* eslint-disable spaced-comment */
/* eslint-disable one-var */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable keyword-spacing */
/* eslint-disable padded-blocks */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const firebase = require("firebase");
const { admin, fireDatabase } = require("../util/admin.js");
const config = require("../util/config.js");

firebase.initializeApp(config);

const { validateLogin, validateSignUp } = require("../util/validators");

exports.loginUser = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };   

    const { valid, errors } = validateLogin(user);
    if(!valid) {
        res.status(400).json(errors);
    }

    firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then((data) => {
        return data.user.getIdToken();
    })
    .then((token) => {
        return res.json(token);
    })
    .catch((err) => {
        console.error(err);
        return res.status(403).json({ message: "incorrect email or password, please try again." });
    });
};

exports.signUpUser = (req, res) => {
    const userName = req.body.firstName + " " + req.body.lastName;
    const newUser = {
        name: userName,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
    };

    const { valid, errors } = validateSignUp(newUser);

    if(!valid) {
        res.status(400).json(errors);
    }

    let token, userId;
    fireDatabase
    .doc(`/users/${newUser.email}`)
    .get()
    .then((document) => {
        /*if(document.exists) {
            return res.status(400).json({ email: "email is already registered with an account" });
        }*/
        return firebase
                .auth()
                .createUserWithEmailAndPassword(
                    newUser.email,
                    newUser.password
                );
    })
    .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
    })
    .then((idToken) => {
        token = idToken;
        const userInfo = {
            name: newUser.name,
            email: newUser.email,
            createdAt: new Date().toISOString(),
            userId,
        };
        return fireDatabase
                .doc(`/users/${newUser.email}`)
                .set(userInfo);
    })
    .then(() => {
        return res.status(201).json({ token });
    })
    .catch((err) => {
        console.error(err);
        if(err.code === "auth/email-already-in-use") {
            return res.status(400).json({ email: "email already registered with another account" });
        }
        return res.status(500).json({ general: "Something went wrong, please try again" });
    });
};

exports.getUserInfo = (req, res) => {
    let userInfo = {};
    fireDatabase
    .doc(`users/${req.user.email}`)
    .get()
    .then((document) => {
        if(document.exists) {
            userInfo.userCredentials = document.data();
            return res.json(userInfo);
        }
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getAllUsers = (req, res) => {
    fireDatabase
    .collection("users")
    .orderBy("name", "asc")
    .get()
    .then((data) => {
        let users = [];
        data.forEach((document) => {
            users.push({
                id: document.id,
                name: document.data().name,
                email: document.data().email,
                userId: document.data().userId,
                createdAt: document.data().createdAt,
            });
        });
        return res.json(users);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getUserFromName = (req, res) => {
    let userInfo = {};
    //console.log(req.params.userName);
    fireDatabase
    .collection("users")
    .where("name", "==", req.params.userName)
    .get()
    .then((data) => {
       data.forEach((document) => {
            console.log(document.data().name);
            userInfo = document.data();
            return res.json(userInfo);
        });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getUserFromEmail = (req, res) => {
    let userInfo = {};
    fireDatabase
    .doc(`users/${req.params.userEmail}`)
    .get()
    .then((document) => {
        if(document.exists) {
            userInfo.userCredentials = document.data();
            return res.json(userInfo);
        }
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.updateUserInfo = (req, res) => {
    let document = fireDatabase
                    .collection("users")
                    .doc(`${req.user.email}`);

    document
    .update(req.body)
    .then(() => {
        res.json({ message: "Updated successfully!" });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ message: "Unable to update user" });
    });
};
