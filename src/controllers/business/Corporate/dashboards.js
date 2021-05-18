const checkEmpty = require('../../../middlewares/checkEmpty.mid');
const CorporatePanel = require('../../../models/Corporate_Panel.model');
const Corporate_panel_department = require('../../../models/Corporate_Panel_Departments.model');
const RequestsModel = require('../../../models/Requests.model');
const UserModel = require('../../../models/User.model');
const Service = require('../../../models/Services.model');
const EmployeeModel = require('../../../models/Employee.model');
const bcrypt = require('bcrypt');
const accessToken = require('../../../middlewares/token.mid');

exports.departmentManagerDashboard = async (req, res, next) => {
    try {
        if (req.user.role_id == 6) {
            let employee = await EmployeeModel.findOne({ where: { user_id: req.user.id } }, { type: sequelize.QueryTypes.SELECT });
            if (employee) {
                if (employee.dataValues.corporate_panel_department_id !== undefined || employee.dataValues.corporate_panel_department_id !== null) {
                    let services = await Service.findAll({ where: { department_id: employee.dataValues.corporate_panel_department_id } }, { type: sequelize.QueryTypes.SELECT });
                    let query = "SELECT e.id AS employee_id, user_id , u.name AS employee_name, speciality, education, u.email, u.cell, u.role_id, u.address FROM `employees` e  "
                    query += " LEFT JOIN `users` u ON u.id=e.user_id"
                    query += " WHERE e.corporate_panel_department_id=15"
                    query += " AND u.role_id=2"
                    let employees = await sequelize.query(query, { type: sequelize.QueryTypes.SELECT })
                    res.status(200).json({
                        status: 200,
                        services,
                        employees
                    })
                }
            } else {
                res.status(200).json({
                    status: 400,
                    message: "Error while fetching data"
                })
            }
        } else {
            res.status(200).json({
                status: 400,
                message: "Error while fetching data"
            })
        }


    } catch (err) {

    }
}