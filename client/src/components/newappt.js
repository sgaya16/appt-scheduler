import React, { useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/loaderbutton.js";
import { useFormFields } from "../libs/hooksLib.js";
import axios from 'axios';
import './newappt.css'

export default function NewAppt() {
    const [fields, handleFieldChanges] = useFormFields({
        date: "",
        time: "",
        approver: "",
    });
    const [posted, setPosted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function validateForm() {
        if(fields.date.length === 0 || fields.time.length === 0 || fields.date.approver === 0) {
            errors.push("all fields must be filled out");
            return false;
        }
        return true;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("handle submit function entered");
        try {
            setIsLoading(true);
            //gets auth token and user email that was stored locally at login/signup
            const authToken = localStorage.getItem("AuthToken");
            const userEmail = localStorage.getItem("UserEmail");
            //console.log(authToken);
            axios.defaults.headers.common["Authorization"] = authToken;
            const approverInfo = await axios.get(`/user/${fields.approver}`);
            //console.log(approverInfo.data);
            
            const newAppt = {
                requester: userEmail,
                approver: approverInfo.data.email,
                date: fields.date,
                time: fields.time,
                pending: true,
                approved: false,
                createdAt: new Date().toISOString()
            };

            const response = await axios.post("/newappt", newAppt);
            console.log("new appt with id: " + response.data.id);
            setPosted(true);
            setIsLoading(false);
        }
        catch(err) {
            console.error(err);
            errors.push("Problem adding new appointment");
            setIsLoading(false);
        }
    };

    function handleConfirmationSubmit(event) {
        event.preventDefault();
        console.log("confirmation function entered");
        history.push("/home");
    };

    function renderAppt() {
        return(
            <Form onSubmit={handleSubmit}>
                <h3>New Appointment Request</h3>
                <Form.Group controlId="date" size="s">
                    <Form.Label>Date</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="date"
                        placeholder="MM/DD/YYYY"
                        value={fields.date}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="time" size="s">
                    <Form.Label>Time</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="time"
                        placeholder="HH:MM AM TMZ"
                        value={fields.time}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="approver" size="s">
                    <Form.Label>Meeting With:</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="approver"
                        placeholder="John Smith"
                        value={fields.approver}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <LoaderButton
                    block
                    size="s"
                    type="submit"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Submit Appointment
                </LoaderButton>
            </Form>
        );
    };

    function renderConfirmation() {
        return(
            <div className="confirmation">
                <h3>Appointment submitted!</h3>
                <LoaderButton
                    block
                    size="s"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    onClick={handleConfirmationSubmit}
                >
                   Go to home
                </LoaderButton>
            </div>
        );
    };

    return(
        <div className="NewAppt">
        {posted === false ? renderAppt() : renderConfirmation()}
        </div> 
    );
}
