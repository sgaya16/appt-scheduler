/* eslint-disable space-before-blocks */
/* eslint-disable keyword-spacing */
/* eslint-disable no-tabs */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable semi */
/* eslint-disable indent */
/* eslint-disable eol-last */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-unused-vars */
const { fireDatabase } = require("../util/admin.js");

exports.getAllAppointmentsByRequester = (req, res) => {
    fireDatabase
    .collection("appointments")
    .where("requester", "==", req.user.email)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
        let appts = [];
        data.forEach((document) => {
            appts.push({
                id: document.id,
                requester: document.data().requester,
                approver: document.data().approver,
                date: document.data().date,
                time: document.data().time,
                pending: document.data().pending,
                approved: document.data().approved,
                createdAt: document.data().createdAt,
            });
        });
        return res.json(appts);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getAllAppointmentsByApprover = (req, res) => {
    fireDatabase
    .collection("appointments")
    .where("approver", "==", req.user.email)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
        let appts = [];
        data.forEach((document) => {
            appts.push({
                id: document.id,
                requester: document.data().requester,
                approver: document.data().approver,
                date: document.data().date,
                time: document.data().time,
                pending: document.data().pending,
                approved: document.data().approved,
                createdAt: document.data().createdAt,
            });
        });
        return res.json(appts);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getAllApprovedAppointments = (req, res) => {
    fireDatabase
    .collection("appointments")
    .where("requester", "==", req.user.email)
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
        let appts = [];
        data.forEach((document) => {
            if(document.data().approved === false) {
                return;
            }
            appts.push({
                id: document.id,
                requester: document.data().requester,
                approver: document.data().approver,
                date: document.data().date,
                time: document.data().time,
                pending: document.data().pending,
                approved: document.data().approved,
                createdAt: document.data().createdAt,
            });
        });
        return res.json(appts);
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.getAppointment = (req, res) => {
    const appt = {
        "id": 1,
        "requester": "Sara Gaya",
        "appt": new Date(),
        "approved": false,
        "createdAt": new Date(),
    }
    return res.json(appt);
};

exports.postAppointment = (req, res) => {
    if (!req.body) {
		return res.status(400).json({ body: "request field empty" });
    }

    const newAppt = {
        requester: req.user.email,
        approver: req.body.approver,
        date: req.body.date,
        time: req.body.time,
        pending: req.body.pending,
        approved: req.body.approved,
        createdAt: req.body.createdAt,
    };
    console.log(newAppt);

    fireDatabase
    .collection("appointments")
    .add(newAppt)
    .then((document) => {
        const resNewAppt = newAppt;
        resNewAppt.id = document.id;
        return res.json(resNewAppt);
    })
    .catch((err) => {
        res.status(500).json({ error: "could not post to database" });
        console.error(err);
    });
};

exports.deleteAppointment = (req, res) => {
    console.log(req.params.apptId);
    const document = fireDatabase.doc(`/appointments/${req.params.apptId}`);
    document
    .get()
    .then((doc) => {
        if(!doc.exists) {
            return res.status(404).json({ error: "Appointment not found" });
        }
        if(doc.data().requester !== res.user.email){
            return res.status(403).json({error: "Unauthorized" });
        }
        return document.delete();
    })
    .then(() => {
        res.json({ message: "Delete successful!" });
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};

exports.updateAppointment = (req, res) => {
    if(req.body.id || req.body.createdAt) {
        res.status(403).json({message: "Cannot change id or created timestamp"});
    }

    let documentToUpdate = fireDatabase
    .collection("appointments")
    .doc(`${req.params.apptId}`);

    documentToUpdate.update(req.body)
    .then(()=> {
        res.json({message: "Updated successfully!"});
    })
    .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
    });
};
