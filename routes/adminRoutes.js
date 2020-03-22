const express = require("express");
const crypto = require("crypto");
const Admin = require('../models/Admin');

const router = express.Router();

router.post("/register", (req, res) => {
    //Get admin details for registration
    let fullname = req.body.fullname;
    let email = req.body.email;
    let password = req.body.password;

    //Create a new admin
    const admin = new Admin({
        fullname: fullname,
        email: email,
        password: crypto.createHash("md5").update(password).digest('hex')
    });

    admin.save()
    .then(result => {
        res.json({
            status: "admin_reg_success",
            data : result
        });
    })
    .catch(error => {
        res.json({
            status: "admin_reg_failed"
        });
    });

});

router.post("/login", (req, res) => {
    //Get admin details for login
    let email = req.body.email;
    let password = req.body.password;

    //Authenticate admin
    const admin = Admin.findOne({email: email, password: crypto.createHash("md5").update(password).digest('hex')});
    
    admin.exec()
    .then(result => {
        res.json({
            status: "admin_auth_success",
            data: result
        });
    })
    .catch(error => {
        res.json({
            status: "admin_auth_failed"
        });
    });

});

module.exports = router;