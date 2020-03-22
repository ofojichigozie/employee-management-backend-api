const mongoose = require("mongoose");

const VerificationListSchema = mongoose.Schema({
    employeeUUID: {
        type: String,
        required: true
    },
    verificationDate: {
        type: String,
        required: true
    },
    verificationTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('VerificationList', VerificationListSchema);