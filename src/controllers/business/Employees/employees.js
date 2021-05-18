const checkEmpty = require('../../../middlewares/checkEmpty.mid');
const CorporatePanel = require('../../../models/Corporate_Panel.model');
const EmployeeModel = require('../../../models/Employee.model');
const UserModel = require('../../../models/User.model');
const bcrypt = require('bcrypt');
const Corporate_OrdersModel = require('../../../models/Corporate_Orders.model');
const { Op } = require('sequelize');

exports.createCorporateEmployees = async (req, res, next) => {
    try {
        let { employee, corporate_id, corporate_department_id } = req.body;
        let corporate = await CorporatePanel.findByPk(corporate_id);
        if (corporate) {
            // let request = await RequestsModel.findOne({ where: { user_id: req.user.id } });
            // if (request) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash("11111111", salt);
            // let new_corporate_name = request.dataValues.company_name.split(" ");
            // let checkUser = await
            let checkUser = await UserModel.findOne({ where: { email: employee.email } });
            if (checkUser) {
                res.status(200).json({
                    status: 400,
                    message: "User already exists with this email"
                })
            } else {
                let user = await UserModel.create({
                    name: employee.name,
                    email: employee.email,
                    role_id: 2,
                    cell: employee.phone_number,
                    address: employee.address,
                    password: hash
                });
                if (user) {
                    // console.log(re)
                    if (req.user.role_id == 6) {
                        console.log('as manager')
                        let manager = await EmployeeModel.findOne({ where: { user_id: req.user.id } });
                        await creeateEmployee(user.dataValues, res, corporate_department_id, employee, manager.dataValues.panel_id)
                    } else if (req.user.role_id == 4) {
                        console.log('as admin')
                        await creeateEmployee(user.dataValues, res, corporate_department_id, employee, req.user.id)
                    }
                } else {
                    res.status(200).json({
                        status: 400,
                        message: "Error while creating employee"
                    })
                }
            }
        } else {
            res.status(200).json({
                status: 400,
                message: "Error while creating employee"
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: err.message
        })
    }
}
exports.editCorporateEmployees = async (req, res, next) => {
    try {
        const { name, email, phone_number, speciality, education, employee_id, max_allowed } = req.body;
        // console.log(req.body)
        if (checkEmpty(name) || checkEmpty(email) || checkEmpty(speciality) || checkEmpty(phone_number)) {
            res.status(200).json({
                status: 409,
                message: "Please provide all the required fields"
            })
        } else {
            let employee = await EmployeeModel.findByPk(employee_id);
            if (employee) {
                let user = await UserModel.findByPk(employee.dataValues.user_id);
                if (user) {
                    if (user.dataValues.email == email) {
                        if (user.dataValues.cell == phone_number) {
                            let updateUser = await UserModel.update({ name, email: email, cell: phone_number, education, speciality }, {
                                where: { id: user.dataValues.id }
                            })
                            if (updateUser) {
                                let updateEmp = await EmployeeModel.update({ education, speciality, max_allowed }, {
                                    where: { id: employee.dataValues.id }
                                })
                                if (updateEmp) {
                                    res.status(200).json({
                                        status: 200,
                                        message: "User details updated successfully"
                                    })
                                } else {
                                    res.status(200).json({
                                        status: 400,
                                        message: "Error while updating employee"
                                    })
                                }
                            } else {
                                res.status(200).json({
                                    status: 400,
                                    message: "Error while updating employee"
                                })
                            }
                        } else {
                            let checkPhone = await UserModel.findAll({ where: { cell: phone_number } });
                            if (checkPhone.length > 0) {
                                res.status(200).json({
                                    status: 400,
                                    message: "Phone number already in use please select a different phone number"
                                })
                            } else {
                                let updateUser = await UserModel.update({ name: name, email: email, cell: phone_number, education: education, speciality }, {
                                    where: { id: user.dataValues.id }
                                })
                                if (updateUser) {
                                    let updateEmp = await EmployeeModel.update({ education, speciality, max_allowed }, {
                                        where: { id: employee.dataValues.id }
                                    })
                                    if (updateEmp) {
                                        res.status(200).json({
                                            status: 200,
                                            message: "User details updated successfully"
                                        })
                                    } else {
                                        res.status(200).json({
                                            status: 400,
                                            message: "Error while updating employee"
                                        })
                                    }
                                } else {
                                    res.status(200).json({
                                        status: 400,
                                        message: "Error while updating employee"
                                    })
                                }
                            }
                        }
                    } else {
                        let checkEmail = await UserModel.findAll({ where: { email: email } });
                        if (checkEmail.length > 0) {
                            res.status(200).json({
                                status: 400,
                                message: "Email already exists, Please select a different email address"
                            })
                        } else {
                            if (user.dataValues.cell == phone_number) {
                                let updateUser = await UserModel.update({ name: name, email: email, cell: phone_number, education: education }, {
                                    where: { id: user.dataValues.id }
                                })
                                if (updateUser) {
                                    let updateEmp = await EmployeeModel.update({ education, speciality }, {
                                        where: { id: employee.dataValues.id }
                                    })
                                    if (updateEmp) {
                                        res.status(200).json({
                                            status: 200,
                                            message: "User details updated successfully"
                                        })
                                    } else {
                                        res.status(200).json({
                                            status: 400,
                                            message: "Error while updating employee"
                                        })
                                    }
                                } else {
                                    res.status(200).json({
                                        status: 400,
                                        message: "Error while updating employee"
                                    })
                                }
                            } else {
                                let checkPhone = await UserModel.findAll({ where: { cell: phone_number } });
                                if (checkPhone.length > 0) {
                                    res.status(200).json({
                                        status: 400,
                                        message: "Phone number already in use please select a different phone number"
                                    })
                                } else {
                                    let updateUser = await UserModel.update({ name: name, email: email, cell: phone_number, education: education }, {
                                        where: { id: user.dataValues.id }
                                    })
                                    if (updateUser) {
                                        let updateEmp = await EmployeeModel.update({ education, speciality }, {
                                            where: { id: employee.dataValues.id }
                                        })
                                        if (updateEmp) {
                                            res.status(200).json({
                                                status: 200,
                                                message: "User details updated successfully"
                                            })
                                        } else {
                                            res.status(200).json({
                                                status: 400,
                                                message: "Error while updating employee"
                                            })
                                        }
                                    } else {
                                        res.status(200).json({
                                            status: 400,
                                            message: "Error while updating employee"
                                        })
                                    }
                                }
                            }
                        }
                    }
                    // let updateUser = await UserModel.update({name: user.name, email: email, cell: phone_number})
                    // let updateEmployee = await EmployeeModel.update({ name, email, cell: phone_number, speciality, education }, {
                    //     where: { id: employee_id },
                    // });
                    // if (updateEmployee) {
                    //     res.status(200).json({
                    //         status: 200,
                    //         message: "Employee details updated successfully"
                    //     })
                    // }
                } else {
                    res.status(200).json({
                        status: 400,
                        message: "Error while updating employee"
                    })
                }
            } else {
                res.status(200).json({
                    status: 400,
                    message: "Error while updating employee"
                })
            }
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: err.message
        })
    }
}
exports.viewCorporateEmployees = async (req, res, next) => {
    try {
        const { corporate_department_id } = req.body;
        let query = " SELECT e.id as id,  e.user_id as user_id, e.max_allowed,e.panel_id as panel_id, e.corporate_panel_department_id as corporate_panel_department_id, "
        query += " e.speciality as speciality, e.education as education , u.name as name, u.email as email, u.cell as cell, "
        query += " e.createdAt as createdAt, e.updatedAt as updatedAt , u.address as address , u.image as image, u.device_id  as device_id FROM `employees` e"
        query += " LEFT JOIN `users` u ON e.user_id=u.id WHERE (e.corporate_panel_department_id=" + corporate_department_id + " AND u.role_id=2)"
        let employees = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
        // console.log(employees)
        if (employees.length > 0) {
            res.status(200).json({
                status: 200,
                employees
            })
        } else {
            res.status(200).json({
                status: 200,
                employees: []
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: err.message
        })
    }
}
exports.deleteCorporateEmployees = async (req, res, next) => {
    try {
        const { employee_id } = req.body;
        let employee = await EmployeeModel.findByPk(employee_id);
        if (employee) {
            let user = await UserModel.findByPk(employee.dataValues.user_id);
            if (user) {
                let deleteUser = await UserModel.destroy({
                    where: { id: employee.dataValues.user_id },
                });
                if (deleteUser) {
                    let deleteEmployee = await EmployeeModel.destroy({
                        where: { id: employee.dataValues.id },
                    });
                    if (deleteEmployee) {
                        res.status(200).json({
                            status: 200,
                            message: "Employee deleted successfully"
                        })
                    } else {
                        res.status(200).json({
                            status: 400,
                            message: "Error while deleting employee"
                        })
                    }
                } else {
                    res.status(200).json({
                        status: 400,
                        message: "Error while deleting employee"
                    })
                }
            } else {
                res.status(200).json({
                    status: 400,
                    message: "Error while deleting employee"
                })
            }
        } else {
            res.status(200).json({
                status: 400,
                message: "Error while deleting employee"
            })
        }
    } catch (err) {
        next(err);
        res.status(200).json({
            status: 400,
            message: err.message
        })
    }
}


// For Doctors

exports.customersInQueue = async (req, res, next) => {
    try {
        UserModel.hasMany(Corporate_OrdersModel, { foreignKey: 'user_id' });
        Corporate_OrdersModel.belongsTo(UserModel, { foreignKey: 'user_id' });

        let employee = await EmployeeModel.findOne({ where: { user_id: req.user.id } });
        if (employee) {
            let queue = await Corporate_OrdersModel.findAll({
                where: {
                    employee_id: employee.dataValues.id,
                    status: { [Op.eq]: 'waiting' },
                },
                include: [{
                    model: UserModel
                }]
            }, { type: sequelize.QueryTypes.SELECT });
            res.status(200).json({
                status: 200,
                queue
            })
        } else {
            res.status(200).json({
                status: 200,
                queue: []
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.customersServed = async (req, res, next) => {
    try {
        UserModel.hasMany(Corporate_OrdersModel, { foreignKey: 'user_id' });
        Corporate_OrdersModel.belongsTo(UserModel, { foreignKey: 'user_id' });

        let queue = await Corporate_OrdersModel.findAll({
            where: {
                employee_id: req.user.id,
                status: { [Op.eq]: 'done' },
            },
            include: [{
                model: UserModel
            }]
        }, { type: sequelize.QueryTypes.SELECT });
        res.status(200).json({
            status: 200,
            queue
        })

    } catch (err) {
        next(err);
    }
}
exports.customersInServing = async (req, res, next) => {
    try {
        UserModel.hasMany(Corporate_OrdersModel, { foreignKey: 'user_id' });
        Corporate_OrdersModel.belongsTo(UserModel, { foreignKey: 'user_id' });

        let queue = await Corporate_OrdersModel.findAll({
            where: {
                employee_id: req.user.id,
                status: { [Op.eq]: 'working' },
            },
            include: [{
                model: UserModel
            }]
        }, { type: sequelize.QueryTypes.SELECT });
        res.status(200).json({
            status: 200,
            queue
        })

    } catch (err) {
        next(err);
    }
}


// -------------------------- Functions ----------------------------

let creeateEmployee = async (user, res, corporate_department_id, employee, id) => {
    try {
        let newEmployee = await EmployeeModel.create({
            user_id: user.id,
            panel_id: id,
            corporate_panel_department_id: corporate_department_id,
            speciality: employee.speciality,
            education: employee.education,
            max_allowed: employee.max_allowed
        });
        if (newEmployee) {
            res.status(200).json({
                status: 200,
                message: "Employee added successfully"
            })
        } else {
            res.status(200).json({
                status: 400,
                message: "Error while creating employee"
            })
        }
    } catch (err) {
        console.error(err)
    }
}
