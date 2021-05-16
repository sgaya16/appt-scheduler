import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import './appt.css'

export default function Appt() {
    const { id } = useParams();
    const history = useHistory();

    function redirectToHome(event) {
        event.preventDefault();
        console.log("confirmation function entered");
        console.log(id);
        history.push("/home");
    }

    return (
        <div className="Appt">
            <h3>Update Submitted!</h3>
            <Button
                    block
                    size="s"
                    type="submit"
                    variant="success"
                    onClick={redirectToHome}
            >
                   Go to home
            </Button>
        </div>
    );
};