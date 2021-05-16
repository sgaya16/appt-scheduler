import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import LoaderButton from "../components/loaderbutton.js";
import { useFormFields } from "../libs/hooksLib.js";
import axios from 'axios';
import './signup.css'

export default function Signup() {
    //react hooks to update state
    const [fields, handleFieldChanges] = useFormFields({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    function validateForm() {
        if(fields.email.length === 0 || fields.password.length === 0 || fields.firstName.length === 0 || fields.lastName.length === 0 || fields.confirmPassword.length === 0) {
            errors.push("all fields must be filled");
            return false;
        }
        if(!fields.email.includes("@")) {
            errors.push("must enter valid email");
            return false;
        }
        if(fields.password !== fields.confirmPassword) {
            errors.push("passwords must match");
            return false;
        }
        //resets errors array so that it is empty 
        //setErrors([]);
        return true;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        console.log("handle submit entered");
        setIsLoading(true);

        const userInfo = {
            firstName: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            password: fields.password,
            confirmPassword: fields.confirmPassword
        };
        
        try {
            const response = await axios.post("/signup", userInfo);
            localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
            localStorage.setItem("UserEmail", userInfo.email);
            //history.push("/");
            setNewUser(userInfo);
            setIsLoading(false);
        }
        catch(err) {
            console.error(err.response.data);
            errors.push("login failed");
        }
    };

    function handleConfirmationSubmit(event) {
        event.preventDefault();
        console.log("confirmation function entered");
        history.push("/home");
    };

    function renderSignup() {
        return(
            <Form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <Form.Group controlId="firstName" size="s">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="firstName"
                        value={fields.firstName}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="lastName" size="s">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="lastName"
                        value={fields.lastName}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="email" size="s">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="password" size="s">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <Form.Group controlId="confirmPassword" size="s">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        autoFocus
                        type="confirmPassword"
                        value={fields.confirmPassword}
                        onChange={handleFieldChanges}
                    />
                </Form.Group>

                <LoaderButton
                    block
                    size="s"
                    type="submit"
                    variant="success"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Sign Up!
                </LoaderButton>
            </Form>
        );
    };

    function renderConfirmation() {
        return(
            <div className="confirmation">
                <h3>Hi { fields.firstName }!</h3>
                <p>Thanks for signing up!</p>
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
    }

    return(
      <div className="Signup">
      {newUser === null ? renderSignup() : renderConfirmation()}
      </div> 
    );
};

