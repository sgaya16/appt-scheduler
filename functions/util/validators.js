/* eslint-disable no-useless-escape */
/* eslint-disable no-tabs */
/* eslint-disable padded-blocks */
/* eslint-disable max-len */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable keyword-spacing */
/* eslint-disable indent */
/* eslint-disable eol-last */
const isEmpty = (string) => {
    if(string === "") {
        return true;
    }
    return false;
};

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) {
        return true;
    }
    return false;
};

exports.validateLogin = (data) => {
    let errors = {};
    if(isEmpty(data.email)) {
        errors.email = "cannot be empty";
    }
    if(isEmpty(data.password)) {
        errors.password = "cannot be empty";
    }
    return {
        errors,
        //if there are no errors, valid is true, otherwise it is false
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};

exports.validateSignUp = (data) => {
    let errors = {};

    if(isEmpty(data.email)) {
        errors.email = "cannot be empty";
    }
    if(!isEmail(data.email)) {
        errors.email = "invalid email address";
    }

    if(isEmpty(data.firstName)) {
        errors.firstName = "first name cannot be empty";
    }
    if(isEmpty(data.lastName)) {
        errors.lastName = "last name cannot be empty";
    }
    if(isEmpty(data.phoneNumber)) {
        errors.phoneNumber = "phone number cannot be empty";
    }
    if(isEmpty(data.password)) {
        errors.password = "password cannot be empty";
    }
    //checks that passwords match during signup
    if(data.password !== data.confirmPassword) {
        errors.confirmPassword = "passwords must match";
    }

    return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};