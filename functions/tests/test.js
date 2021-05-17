/* eslint-disable padded-blocks */
/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
/* eslint-disable spaced-comment */
/* eslint-disable semi */
/* eslint-disable eol-last */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable quotes */
// At the top of test/index.test.js
/*const assert = require("assert");
const firebase = require("@firebase/testing");*/

const test = require('firebase-functions-test')({
    //databaseURL: 'pocket-rn-assignment-8be6b.firebaseapp.com',
    //storageBucket: 'pocket-rn-assignment-8be6b.appspot.com',
    projectId: 'pocket-rn-assignment-8be6b',
});
  //'/Users/saragaya/Downloads/pocket-rn-assignment-8be6b-firebase-adminsdk-lhdbb-1e4fb13684.json');

const { postAppointment, updateAppointment, deleteAppointment } = require('../API/schedule.js');

describe('appointment API', () => {
    it('successfully posts appointment to firestore', async () => {
        const wrapped = test.wrap(postAppointment);

        const testDate = new Date().toISOString();
        const testData = {
            requester: "Sara Gaya",
            approver: "Lourdes Delavega",
            date: "2021-06-10",
            time: "11:30",
            pending: true,
            approved: false,
            createdAt: testDate,
        };

        const result = await wrapped(testData, {
            auth: {
                uid: 'Q94lwjGcnZb2z9ZjmzjDVIFRSLG2',
            },
                authType: 'USER',
            }
        );

        expect(result).to.eql({
            requester: "Sara Gaya",
            approver: "Lourdes Delavega",
            date: "2021-06-10",
            time: "11:30",
            pending: true,
            approved: false,
            createdAt: testDate,
          });
    });

    it('successfully updates appointment in firestore', async () => {
        const wrapped = test.wrap(updateAppointment);

        const apptId = "/appt/yEhFPDMPB0NlrxAg7vUU";

        const result = await wrapped(apptId, {
            auth: {
                uid: 'Q94lwjGcnZb2z9ZjmzjDVIFRSLG2',
            },
                authType: 'USER',
            }
        );

        expect(result).to.eql({
            message: "Updated successfully!",
          });
    });

    it('successfully deletes appointment in firestore', async () => {
        const wrapped = test.wrap(deleteAppointment);

        const apptId = "/appt/yEhFPDMPB0NlrxAg7vUU";

        const result = await wrapped(apptId, {
            auth: {
                uid: 'Q94lwjGcnZb2z9ZjmzjDVIFRSLG2',
            },
                authType: 'USER',
            }
        );

        expect(result).to.eql({
            message: "Delete successful!",
          });
    });
});