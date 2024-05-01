const express = require('express');
const router = express.Router();

const { getEmployees, createEmployees, updateEmployees, deleteEmployees, getEmployeesById } = require('../controllers/employees.controllers');




router.get('/employees', getEmployees);

router.get('/employees/:id', getEmployeesById);

router.post('/employees',createEmployees)

//Para acutalizar algunos datos debemos utilizar patch , si queremos actualizar todos se usa el PUT
router.patch('/employees/:id', updateEmployees)
    
router.delete('/employees/:id', deleteEmployees)





module.exports = router;