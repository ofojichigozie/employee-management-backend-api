const express = require('express');
const Employee = require('../models/Employee');
const VerificationList = require('../models/VerificationList');

const router = express.Router();

router.get('/employees', (req, res) => {
    //Get all employees from the database
    const employee = Employee.find();

    employee.exec()
    .then(result => {
        res.json({
            status: "employees_success",
            data: result
        });
    })
    .catch(error => {
        res.json({
            status: "employees_failed"
        });
    });

});

router.post('/register', (req, res) => {
    //Get employee details for registration
    let surname = req.body.surname;
    let otherNames = req.body.otherNames;
    let sex = req.body.sex;
    let maritalStatus = req.body.maritalStatus;
    let email = req.body.email;
    let contact = req.body.contact;
    let uuid = req.body.UUID;
    let position = req.body.position;

    const employee = new Employee({
        surname: surname,
        otherNames: otherNames,
        sex: sex,
        maritalStatus: maritalStatus,
        email: email,
        contact: contact,
        uuid: uuid,
        position: position
    });

    console.log(employee);

    employee.save()
    .then(result => {
        res.json({
            status: "employee_reg_success",
            data: result
        });
    })
    .catch(error => {
        res.json({
            status: "employee_reg_failed"
        });
    });

});

router.get('/verification/:uuid', (req, res) => {
    //Get employee's uuid for verification
    let uuid = req.params.uuid;
    let date = "28-02-2020";
    let time = "02:54PM";

    const employee = Employee.findOne({uuid: uuid});

    employee.exec()
    .then(eResult => {
        //If an employee with the UUID is found, add to verification list
        const vList = new VerificationList({
            employeeUUID: uuid,
            verificationDate: date,
            verificationTime: time
        });

        vList.save()
        .then(vResult => {
            res.json({
                status: "verification_succeeded",
                employee: eResult,
                verification: vResult
            });
        })
        .catch(error => {
            res.json({
                status: "verification _failed"
            });
        });
    })
    .catch(error => {
        res.json({
            status: "verification _failed"
        });
    });
});

router.patch('/update', (req, res) => {
    //Get employee details for registration
    let surname = req.body.surname;
    let otherNames = req.body.otherNames;
    let sex = req.body.sex;
    let maritalStatus = req.body.maritalStatus;
    let email = req.body.email;
    let contact = req.body.contact;
    let uuid = req.body.uuid;
    let position = req.body.position; console.log(req.body);

    const updatedEmployee = Employee.updateOne(
        {uuid: uuid},
        {$set: {
            surname: surname,
            otherNames: otherNames,
            sex: sex,
            maritalStatus: maritalStatus,
            email: email,
            contact: contact,
            position: position
        }}
    );

    updatedEmployee.exec()
    .then(result => {
        res.json({
            status: "employee_updated",
            data: result
        });
    })
    .catch(error => {
        res.json({
            status: "failed_update"
        });
    });

});

router.delete('/delete/:employeeId', (req, res) => {
    const deletedEmployee = Employee.deleteOne({_id: req.params.employeeId});
    deletedEmployee.exec()
    .then(result => {
        res.json({
            status: "employee_deleted"
        });
    })
    .catch(result => {
        res.json({
            status: "employee_not_deleted"
        });
    });
});


module.exports = router;