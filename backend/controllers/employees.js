const Employee = require('../models/Employee')

exports.createEmployee = (req, res, next) => {
    delete req.body._id
    const employee = new Employee({
        ...req.body,
    })
    employee
        .save()
        .then(() => res.status(201).json({ message: 'employee created' }))
        .catch((err) => res.status(400).json({ err }))
}

exports.viewEmployees = (req, res) => {
    Employee.find()
        .then((employees) => res.status(200).json(employees))
        .catch((err) => res.status(400).json({ err }))
}
