const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    surname: {
        type: String,
        required: true
    },
    otherNames: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    uuid: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);