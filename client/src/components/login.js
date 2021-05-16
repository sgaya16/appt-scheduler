import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import LoaderButton from "../components/loaderbutton.js";
import { useHistory } from "react-router-dom";
import { useFormFields } from "../libs/hooksLib.js";
import axios from 'axios';
import './login.css'

export default function Login() {
    //react hooks to update state
    const [fields, handleFieldChanges] = useFormFields({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    const history = useHistory();

    function validateForm() {
        if(fields.email.length === 0 || fields.password.length === 0) {
            errors.push("username and password cannot be empty");
            return false;
        }
        if(!fields.email.includes("@")) {
            errors.push("must enter valid email");
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
            email: fields.email,
            password: fields.password
        };
        
        try {
            const response = await axios.post("/login", userInfo);
            //console.log(response);
            localStorage.setItem("AuthToken", `Bearer ${response.data}`);
            localStorage.setItem("UserEmail", userInfo.email);
            history.push("/home");
        }
        catch(err) {
            console.error(err.response.data);
            errors.push("login failed");
        }
    };

    return(
      <div className="Login">
          <h3>Login Form</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group size="s" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                    autoFocus
                    type="email"
                    value={fields.email}
                    onChange={handleFieldChanges}
                />
            </Form.Group>

            <Form.Group size="s" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    autoFocus
                    type="password"
                    value={fields.password}
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
                Login
            </LoaderButton>            
          </Form>
      </div>  
    );
};



