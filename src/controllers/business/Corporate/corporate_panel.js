const checkEmpty = require('../../../middlewares/checkEmpty.mid');
const CorporatePanel = require('../../../models/Corporate_Panel.model');
const Corporate_panel_department = require('../../../models/Corporate_Panel_Departments.model');
const EmployeeModel = require('../../../models/Employee.model');
const RequestsModel = require('../../../models/Requests.model');
const UserModel = require('../../../models/User.model');
const bcrypt = require('bcrypt');
const accessToken = require('../../../middlewares/token.mid');
const e = require('express');

// -------------------- Corporate Panel --------------------
exports.corporateDetails = async (req, res, next) => {
    try {
        let request = await RequestsModel.findOne({ where: { user_id: req.user.id } });
        if (request) {
            let corporate = await CorporatePanel.findOne({ where: { user_id: req.user.id } });
            if (corporate) {
                res.status(200).json({
                    status: 200,
                    corporate_name: request.dataValues.company_name,
                    corporate_type: request.dataValues.business_type_name,
                    corporate_type_id: request.dataValues.business_type_id,
                    corporate_email: req.user.email,
                    corporate,
                })
            } else {
                res.status(200).json({
                    status: 200,
                    corporate_name: request.dataValues.company_name,
                    corporate_type: request.dataValues.business_type_name,
                    corporate_type_id: request.dataValues.business_type_id,
                    corporate_email: req.user.email,
                    corporate: [],
                })
            }
        } else {
            res.status(200).json({
                status: 400,
                message: "Error while fetching data",
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.corporateDepartmentDetails = async (req, res, next) => {
    try {
        let { corporate_id, corporate_department_id } = req.body;
        if (checkEmpty(corporate_department_id) || checkEmpty(corporate_id)) {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        } else {
            let query = "  SELECT u.*, COUNT(e.id) AS COUNT FROM `employees` e";
            query += " LEFT JOIN `users` u ON u.id=e.user_id"
            query += " WHERE ( e.panel_id=" + req.user.id + " AND corporate_panel_department_id=" + corporate_department_id + " AND u.role_id=2)"
            let query_2 = "  SELECT COUNT(id) AS COUNT FROM `services` WHERE corporate_panel_id=" + req.user.id + " AND department_id=" + corporate_department_id
            let query_3 = " SELECT * FROM `employees` e"
            query_3 += " LEFT JOIN `users` u ON u.id=e.user_id"
            query_3 += " WHERE e.corporate_panel_department_id=" + corporate_department_id
            query_3 += " AND u.role_id=6"
            let employees = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
            let services = await sequelize.query(query_2, { type: sequelize.QueryTypes.SELECT })
            let manager = await sequelize.query(query_3, { type: sequelize.QueryTypes.SELECT })
            // console.log(employees[0].COUNT)
            res.status(200).json({
                status: 200,
                employees: employees[0].COUNT,
                services: services[0].COUNT,
                total_served: 0,
                total_inQueue: 0,
                totalServing: 0,
                manager
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.createCoporate = async (req, res, next) => {
    try {
        let { services, corporate_name } = req.body
        if (services.length > 0) {
            let corporateCheck = await CorporatePanel.findOne({ where: { user_id: req.user.id } });
            if (corporateCheck) {
                if (services.length > 0) {
                    let failed = false;
                    for (let i = 0; i < services.length; i++) {
                        let newDepartment = await Corporate_panel_department.create({
                            name: services[i],
                            user_id: req.user.id,
                            corporate_panel_id: corporateCheck.dataValues.id,
                            parent_id: corporateCheck.dataValues.id
                        })
                        if (newDepartment) {
                            failed = false
                        } else {
                            failed = true
                        }
                    }
                    if (failed) {
                        res.status(200).json({
                            status: 400,
                            message: "Error while creating departments"
                        })
                    } else {
                        res.status(200).json({
                            status: 200,
                            message: "Coporate details updated successfully",
                            corporate_id: corporateCheck.dataValues.id
                        })
                    }
                }
            } else {
                let corporate = await CorporatePanel.create({
                    name: corporate_name,
                    user_id: req.user.id
                });
                if (corporate) {
                    if (services.length > 0) {
                        let failed = false;
                        for (let i = 0; i < services.length; i++) {
                            let newDepartment = await Corporate_panel_department.create({
                                name: services[i],
                                user_id: req.user.id,
                                corporate_panel_id: corporate.dataValues.id,
                                parent_id: corporate.dataValues.id
                            })
                            if (newDepartment) {
                                failed = false
                            } else {
                                failed = true
                            }
                        }
                        if (failed) {
                            res.status(200).json({
                                status: 400,
                                message: "Error while creating departments"
                            })
                        } else {
                            res.status(200).json({
                                status: 200,
                                corporate_id: corporate.dataValues.id
                            })
                        }
                    }
                }
            }
        } else {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.createCoporateDepartment = async (req, res, next) => {
    try {
        let { name, description, corporate_id, manager_name, email, phone_number, address } = req.body;
        // name = "nothing"
        // corporate_id = 1
        // manager_name = "dasdas"
        // email = "uzair111111112111@gmail.com"
        // phone_number = "03049006895"
        // address = "fdsj sfijsidjf jfsdjkfj"
        if (checkEmpty(name) || checkEmpty(corporate_id)
            || checkEmpty(manager_name) || checkEmpty(email) || checkEmpty(phone_number) || checkEmpty(address)) {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        } else {
            let user = await checkIfUserExists(email, phone_number);
            if (user.user_exists) {
                res.status(200).json({
                    status: 200,
                    message: user.message
                })
            } else {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash("11111111", salt);
                let new_user = await UserModel.create({
                    name: manager_name,
                    email: email,
                    cell: phone_number,
                    address: address,
                    role_id: 6,
                    password: hash
                })
                if (new_user) {
                    let corporateDepartment = await Corporate_panel_department.create({
                        name,
                        corporate_panel_id: corporate_id,
                        image: req.file.path,
                        user_id: req.user.id,
                        parent_id: corporate_id,
                        description
                    });
                    if (corporateDepartment) {
                        let manager_as_employee = await EmployeeModel.create({
                            user_id: new_user.dataValues.id,
                            panel_id: req.user.id,
                            corporate_panel_department_id: corporateDepartment.dataValues.id
                        })
                        if (manager_as_employee) {
                            res.status(200).json({
                                status: 200,
                                message: "Corporate department updated successfully"
                            })
                        } else {
                            res.status(200).json({
                                status: 400,
                                message: "Error while creating department"
                            })
                        }
                    } else {
                        res.status(200).json({
                            status: 400,
                            message: "Error while creating department"
                        })
                    }
                } else {
                    res.status(200).json({
                        status: 400,
                        message: "Error while creating department"
                    })
                }
            }
        }
    } catch (err) {
        next(err);
    }
}
exports.viewCorporatePanelDepartments = async (req, res, next) => {
    try {
        let { corporate_id } = req.body;
        const corporatePanels = await Corporate_panel_department.findAll({ where: { corporate_panel_id: corporate_id } });
        if (corporatePanels.length > 0) {
            res.status(200).json({
                status: 200,
                corporatePanels
            })
        } else {
            res.status(200).json({
                status: 200,
                corporatePanels: []
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.editCorporatePanelDetails = async (req, res, next) => {
    try {
        const { name, description, corporate_department_id } = req.body;
        if (checkEmpty(name) || checkEmpty(corporate_department_id)) {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        } else {
            let corporateDepartment = await Corporate_panel_department.findByPk(corporate_department_id);
            if (corporateDepartment) {
                if (req.file.path == undefined) {
                    let update_corporate_department = await Corporate_panel_department.update({ name, description },
                        {
                            where: {
                                id: corporate_department_id
                            }
                        });
                    if (update_corporate_department) {
                        res.status(200).json({
                            status: 200,
                            message: "Corporate department updated successfully"
                        })
                    }
                } else {
                    let update_corporate_department = await Corporate_panel_department.update({ name, description, image: req.file.path },
                        {
                            where: {
                                id: corporate_department_id
                            }
                        });
                    if (update_corporate_department) {
                        res.status(200).json({
                            status: 200,
                            message: "Corporate department updated successfully"
                        })
                    }
                }
            } else {
                res.status(200).json({
                    status: 400,
                    message: "Error while updating!"
                })
            }
        }

    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: "Error while updating!"
        })
    }
}
exports.viewDepartmentDetails = async (req, res, next) => {
    try {
        const { corporate_department_id } = req.body;
        let corporateDepartment = await Corporate_panel_department.findByPk(corporate_department_id);
        if (corporateDepartment) {
            res.status(200).json({
                status: 200,
                corporateDepartment
            })
        } else {
            res.status(200).json({
                status: 400,
                corporateDepartment: {}
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: "Error while updating!"
        })
    }
}
exports.deleteCorporateDepartment = async (req, res, next) => {
    try {
        let { corporate_department_id } = req.body;
        if (checkEmpty(corporate_department_id)) {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        } else {
            let departmnet = await Corporate_panel_department.findByPk(corporate_department_id);
            if (departmnet) {
                let deleteDepartment = await Corporate_panel_department.destroy({ where: { id: corporate_department_id } });
                if (deleteDepartment) {
                    res.status(200).json({
                        status: 200,
                        message: "Department deleted successfully"
                    })
                } else {
                    res.status(200).json({
                        status: 400,
                        message: "Error while deleting Department"
                    })
                }
            }
        }

    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: "Error while deleting Department"
        })
    }
}
exports.loginForManager = async (req, res, next) => {
    try {
        let { user_email, user_password } = req.body;
        // user_email = "uzair@card.com"
        // user_password = "11111111"
        if (user_email.includes('.com')) {
            let user = await UserModel.findOne({ where: { email: user_email } });
            if (user) {
                let match = await bcrypt.compare(user_password, user.dataValues.password);
                if (match) {
                    if (user.dataValues.role_id == 6 || user.dataValues.role_id == 2) {
                        let token = await accessToken(user.dataValues);
                        let employee = await EmployeeModel.findOne({ where: { user_id: user.dataValues.id } });
                        if (employee) {
                            let corporate = await CorporatePanel.findOne({ where: { user_id: employee.dataValues.panel_id } });
                            if (corporate) {
                                let corporate_department = await Corporate_panel_department.findOne({ where: { corporate_panel_id: corporate.dataValues.id } });
                                if (corporate_department) {
                                    res.status(200).json({
                                        status: 200,
                                        message: "Login successful",
                                        token: token,
                                        user: user.dataValues,
                                        corporate_id: corporate.dataValues.id,
                                        corporate_name: corporate.dataValues.name,
                                        corporate_department_id: corporate_department.dataValues.id,
                                        corporate_department_name: corporate_department.dataValues.name
                                    })
                                } else {
                                    res.status(200).json({
                                        status: 401,
                                        message: "Invalid credentials"
                                    })
                                }
                            } else {
                                res.status(200).json({
                                    status: 401,
                                    message: "Invalid credentials"
                                })
                            }
                        } else {
                            res.status(200).json({
                                status: 401,
                                message: "Invalid credentials"
                            })
                        }
                    } else {
                        res.status(200).json({
                            status: 401,
                            message: "Invalid credentials"
                        })
                    }
                } else {
                    res.status(200).json({
                        status: 401,
                        message: "Invalid credentials"
                    })
                }
            }
        } else {
            let user = await UserModel.findOne({ where: { cell: user_email } });
            if (user) {
                let match = await bcrypt.compare(user_password, user.dataValues.password);
                if (match) {
                    if (user.dataValues.role_id == 6) {
                        let token = await accessToken(user);
                        let employee = await EmployeeModel.findOne({ where: { user_id: user.dataValues.id } });
                        if (employee) {
                            let corporate = await CorporatePanel.findOne({ where: { user_id: employee.dataValues.panel_id } });
                            if (corporate) {
                                let corporate_department = await Corporate_panel_department.findOne({ where: { corporate_panel_id: corporate.dataValues.id } });
                                if (corporate_department) {
                                    res.status(200).json({
                                        status: 200,
                                        message: "Login successful",
                                        token: token,
                                        user: user.dataValues,
                                        corporate_id: corporate.dataValues.id,
                                        corporate_name: corporate.dataValues.name,
                                        corporate_department_id: corporate_department.dataValues.id,
                                        corporate_department_name: corporate_department.dataValues.name
                                    })
                                } else {
                                    res.status(200).json({
                                        status: 401,
                                        message: "Invalid credentials"
                                    })
                                }
                            } else {
                                res.status(200).json({
                                    status: 401,
                                    message: "Invalid credentials"
                                })
                            }
                        } else {
                            res.status(200).json({
                                status: 401,
                                message: "Invalid credentials"
                            })
                        }
                    } else {
                        res.status(200).json({
                            status: 401,
                            message: "Invalid credentials"
                        })
                    }
                } else {
                    res.status(200).json({
                        status: 401,
                        message: "Invalid credentials"
                    })
                }
            }
        }

    } catch (err) {
        next(err);
    }
}

// ---------------------------Functions----------------------------
let checkIfUserExists = async (email, cell) => {
    let exists = false;
    let user_email = await UserModel.findOne({ where: { email: email } });
    if (user_email) {

        exists = true;
        return {
            user_exists: true,
            message: "User already exists with this email"
        }
    } else {
        let user_cell = await UserModel.findOne({ where: { cell: cell } });
        console.log(email)
        if (user_cell) {
            exists = true
            return {
                user_exists: true,
                message: "User already exists with this phone"
            }
        } else {
            return {
                user_exists: false,
            }
        }
    }
}