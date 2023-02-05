
const mongoose = require('mongoose');

const user = new mongoose.Schema({
    firstName : {
        type: String,
        required: false
    },
    lastName : {
        type: String,
        required: false
    },
    gender : {
        type: String,
        required: false
    },
    mobile : {
        type: String
    },
    email : {
        type: String,
        required: false
    },
    password : {
        type: String
    },
    dateOfBirth : {
        type: String
    },
    dateOfJoining : {
        type: String,
        required: false
    },
    empCode : {
        type: String,
        required: false
    },
    department : {
        type: String,
        required: false
    },
    designation : {
        type: String,
        required: false
    },
    empType : {
        type: String,
        required: false
    },
    role : {
        type: String,
        required: false
    },
    reportingManager : {
        type: String
    },
    probition : {
        type: String
    },
    noticePeriod : {
        type: String
    },
    bloodGroup : {
        type: String
    },
    fatherName : {
        type: String
    },
    motherName : {
        type: String
    },
    maritialStatus : {
        type: String
    },
    spouseName : {
        type: String
    },
    dateOfBirth : {
        type: String
    },
    marrAnniversiry : {
        type: String
    },
    userType : {
        type: String
    },
    otp : {
        type: String
    },
    address : {
        city: {
            type: String
        },
        state:{
            type: String
        },
        country: {
            type: String,
            default: "India"
        },
        pincode: {
            type: String

        }
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    updatedAt : {
        type: Date,
        default: Date.now
    },
    isActive : {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("user", user);