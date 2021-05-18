const UserModel = require('../../../models/User.model');
const CorporatePanel = require('../../../models/Corporate_Panel.model');
const Corporate_panel_department = require('../../../models/Corporate_Panel_Departments.model');
const bcrypt = require('bcrypt');
const accessToken = require('../../../middlewares/token.mid');
const Corporate_PanelModel = require('../../../models/Corporate_Panel.model');
const Corporate_Panel_Orders = require('../../../models/Corporate_Orders.model');
const { Op } = require('sequelize');

exports.customerLoginForCorporate = async (req, res, next) => {
    try {
        const { customer_name, customer_password, customer_number, status } = req.body;
        let user = await login(customer_name, customer_password, customer_number);
        if (user) {
            res.status(200).json({
                status: 200,
                token: await accessToken(user),
                message: user
            })
        } else {
            res.status(200).json({
                status: 400,
                message: "Invalid credentials"
            })
        }
    } catch (err) {
        next(err);
    }
}
exports.viewCurrentCustomersInQueue = async (req, res, next) => {
    try {
        let { corporate_department_id, employee_id, service_id } = req.body;
        let corporateOrdersWaiting = await Corporate_Panel_Orders.findAll(
            {
                where:
                {
                    status: {
                        [Op.eq]: "waiting"
                    },
                    employee_id: employee_id,
                    department_id: corporate_department_id,
                    service_id: service_id
                }
            });
        let corporateOrdersInWorking = await Corporate_Panel_Orders.findAll(
            {
                where:
                {
                    status: {
                        [Op.eq]: "working"
                    },
                    employee_id: employee_id,
                    department_id: corporate_department_id,
                    service_id: service_id
                }
            });
        let query = " SELECT e.id as employee_id , u.name as employee_name FROM employees e  JOIN `users` u ON u.id=e.user_id WHERE (e.id=" + employee_id + ")"
        let employee = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
        // if ()
        res.status(200).json({
            status: 200,
            waiting: corporateOrdersWaiting.length,
            serving: corporateOrdersInWorking.length,
            estimated_time: 5,
            employee
        })

    } catch (err) {
        next(err);
    }
}
exports.assignTicket = async (req, res, next) => {
    try {
        let { corporate_department_id, service_id, employee_id } = req.body;
        // corporate_department_id = 22;
        // service_id = 22;
        // employee_id = 68;

        // let check if order exists
        let corporateOrders = await Corporate_Panel_Orders.findAll(
            {
                limit: 1,
                where:
                {
                    status: { [Op.ne]: 'done' },
                    employee_id: employee_id,
                    department_id: corporate_department_id,
                    service_id: service_id,
                    user_id: req.user.id
                },
                order: [['createdAt', 'DESC']]
            });
        if (corporateOrders.length > 0) {
            res.status(200).json({
                status: 200,
                order: corporateOrders[0].dataValues
            })
        } else {
            let lastTicket = await totalTIcket_Count(corporate_department_id, service_id)
            let ticketNo = parseInt(lastTicket) + 1;
            let newOrder = await Corporate_Panel_Orders.create({
                user_id: req.user.id,
                employee_id,
                department_id: corporate_department_id,
                service_id: service_id,
                ticket_no: parseInt(ticketNo),
                status: 'waiting',
                in_waiting: new Date()
            });
            if (newOrder) {
                res.status(200).json({
                    status: 200,
                    message: 'new order placed',
                    order: newOrder
                })
            } else {
                res.status(200).json({
                    status: 400,
                    message: 'Error while assigning ticket'
                })
            }
        }
    } catch (err) {
        next(err);
    }
}
exports.checkIfCustomerExistsInQueue = async (req, res, next) => {
    try {
        let record = await Corporate_Panel_Orders.findAll(
            {
                limit: 1,
                where:
                {
                    status: { [Op.ne]: 'done' },
                    user_id: req.user.id
                },
                order: [['createdAt', 'DESC']]
            });
        if (record.length > 0) {
            res.status(200).json({
                status: 200,
                order: record[0].dataValues
            })
        } else {
            res.status(200).json({
                status: 200,
                order: null
            })
        }

    } catch (err) {
        next(err);
    }
}

// ------------------------ Functions --------------------------------

let login = async (customer_name, customer_password, customer_number) => {
    try {
        if (customer_number.includes('.com')) {
            const user = await UserModel.findOne({ where: { email: customer_number } });
            if (user) {
                let match = await bcrypt.compare(customer_password, user.dataValues.password);
                if (match) {
                    return user.dataValues
                } else {
                    return null
                }
            } else {
                let user = await createNewUserWithEmail(customer_number, customer_password, customer_name);
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        } else {
            const user = await UserModel.findOne({ where: { cell: customer_number } });
            if (user) {
                console.log(user.dataValues)
                let match = await bcrypt.compare(customer_password, user.dataValues.password);
                if (match) {
                    return user.dataValues
                } else {
                    return null
                }
            } else {
                let user = await createNewUserWithCell(customer_number, customer_password, customer_name);
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }
    } catch (err) {
        console.error(err);
    }
}
let createNewUserWithCell = async (customer_number, customer_password, customer_name) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(customer_password, salt);
    const user = await UserModel.create({
        cell: customer_number,
        password: hash,
        name: customer_name,
        role_id: 1
    })

    if (user) {
        return user.dataValues
    }
    else
        return null;
}
let createNewUserWithEmail = async (customer_number, customer_password, customer_name) => {
    console.log(customer_number, customer_password, customer_name)
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(customer_password, salt);
    const user = await UserModel.create({
        email: customer_number,
        password: hash,
        name: customer_name,
        role_id: 1
    })

    if (user) {
        return user.dataValues
    }
    else
        return null;
}
let totalTIcket_Count = async (department_id, service_id) => {
    try {
        let allOrders = await Corporate_Panel_Orders.findAll({
            limit: 1,
            where:
            {
                department_id: department_id,
                service_id: service_id
            }, order: [['createdAt', 'DESC']]
        }
        );
        if (allOrders.length > 0) {
            return parseInt(allOrders[0].dataValues.ticket_no)
        } else {
            return 0
        }
    } catch (err) {
        console.error(err)
    }
}