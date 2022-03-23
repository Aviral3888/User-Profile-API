const mongoose = require('mongoose');

// Creating structure of schema

var usersSchema = new mongoose.Schema({

    // Line 1
    name: {
        type: String,
        required: 'Name is required'
    },
    age: {
        type: Number,
        required: 'Age is required'
    },

    // Line 2
    email: {
        type: String,
        required: 'Email is required',
        unique: 'User with this email already exist'
    },
    gender:{
        type:String,
    },

    // Line 3
    mobile: {
        type: Number,
        required: 'Mobile is required'
    },
    dob:{
        type: String,
    },

    // Line 4
    city:{
        type: String,
        required: 'City is required'
    },
    state:{
        type: String,
        required:'State is required'
    },
    country:{
        type: String,
        required:'Country is required'
    },

    // Line 5
    address:{
        type: String,
        required:'Address is required'
    }
    

});

// Validation

// Validation for age
usersSchema.path('age').validate((val) => {
    ageRegex = /^(?:1[01-5][0-9]|120|1[8-9]|[2-9][0-9])$/;
    return ageRegex.test(val);
}, 'Age must be greater than 18.');


// Validation for email
usersSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');


// Validation for mobile
usersSchema.path('mobile').validate((val) => {
    mobileRegex = /^([+]\d{2})?\d{10}$/;
    return mobileRegex.test(val);
}, 'Mobile No. should be of 10 digits');



mongoose.model('User', usersSchema);




// Fields to be  used:
// name, email, age, gender, mobile, dob, city, state, country, address

// Fields Used
//    name, age,
//    email, gender
//    mobile, dob,
//    city, state, country,
//    address
