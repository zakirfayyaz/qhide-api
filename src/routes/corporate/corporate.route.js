// const auth = require('../controllers/auth');
const express = require('express');
let UploadFIle = require('../../middlewares/departmentIcon')
const { corporateDetails, createCoporate, viewCorporatePanelDepartments, editCorporatePanelDetails, createCoporateDepartment, corporateDepartmentDetails, loginForManager } = require('../../controllers/business/Corporate/corporate_panel');
const { protect } = require('../../middlewares/auth.mid');
const { createCorporateEmployees, editCorporateEmployees, viewCorporateEmployees, deleteCorporateEmployees, customersInQueue, customersServed, customersInServing } = require('../../controllers/business/Employees/employees');
const { createCorporateServices, viewCorporateServices, editCorporateServices, deleteCorporateServices } = require('../../controllers/business/Departments/services');
const { departmentManagerDashboard } = require('../../controllers/business/Corporate/dashboards');
const { customerLoginForCorporate, viewCurrentCustomersInQueue, assignTicket, checkIfCustomerExistsInQueue } = require('../../controllers/business/Corporate/customers');
const router = express.Router();


// --------------------------Corporate Panel & Departments------------------------
router.route('/').get(protect, corporateDetails);
router.route('/').put(protect, corporateDepartmentDetails);
router.route('/').post(protect, createCoporate);
router.route('/panels').put(protect, viewCorporatePanelDepartments);
router.route('/panels/update').put(protect, UploadFIle.single("icon"), editCorporatePanelDetails);
router.route('/panels').post(protect, UploadFIle.single("icon"), createCoporateDepartment);
router.route('/panels/login').post(protect, loginForManager);


// -------------------------- Dashboards ------------------------
router.route('/department/manager/dashboard').get(protect, departmentManagerDashboard);


// --------------------------Employees In Coporate------------------------
router.route('/employees').post(protect, createCorporateEmployees);
router.route('/employees').put(protect, editCorporateEmployees);
router.route('/employees/all').put(protect, viewCorporateEmployees);
router.route('/employees/remove').put(protect, deleteCorporateEmployees);



// --------------------------Services Routes-------------------------------
router.route('/services').post(protect, createCorporateServices);
router.route('/services').put(protect, viewCorporateServices);
router.route('/services/update').put(protect, editCorporateServices);
router.route('/services/remove').put(protect, deleteCorporateServices);
module.exports = router;

// --------------------------Customer Logins-------------------------------
router.route('/customer').post(customerLoginForCorporate);
router.route('/customer/details').put(protect, viewCurrentCustomersInQueue);
router.route('/customer/ticket').post(protect, assignTicket);
router.route('/customer').get(protect, checkIfCustomerExistsInQueue);



// ---------------------------For Doctors-----------------------------------
router.route('/customers/waiting').get(protect, customersInQueue);
router.route('/customers/served').get(protect, customersServed);
router.route('/customers/working').get(protect, customersInServing);
module.exports = router;