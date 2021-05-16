import React from 'react';
import { Button } from 'react-bootstrap';
import { BsArrowRepeat } from "react-icons/bs";
import "./loaderbutton.css";

export default function LoaderButton({
    isLoading, 
    className = "",
    disabled = false,
    ...props
}) {
    return(
        <Button
            disabled={disabled || isLoading}
            className={`LoaderButton ${className}`}
            {...props}
        >
            {isLoading && <BsArrowRepeat className="spinning"/>}
            {props.children}
        </Button>
    );
}