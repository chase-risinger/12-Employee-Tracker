// packages needed for this application
const inquirer = require('inquirer');
const db = require('./db/connection');

// Connect to the database
db.connect(err => {
    if (err) {
        throw error
    }
    promptUser();
});

// prompt user for action
const promptUser = () => {
    inquirer
        .prompt([{
            name: `action`,
            type: `list`,
            message: `What would you like to do?`,
            choices: [
                `View all Employees`,
                `View all Roles`,
                `View all Departments`,
                `Add an Employee`,
                `Add a Role`,
                `Add a Department`,
                `Update an Employee's Role`,
                `Exit`
            ]
        }
        ])
        .then((response) => {
            switch (response.action) {
                case `View all Employees`: viewEmployees(); break;
                case `View all Roles`: viewRole(); break;
                case `View all Departments`: viewDepartment(); break;
                case `Add a Department`: addDepartment(); break;
                case `Add a Role`: addRole(); break;
                case `Add an Employee`: addEmployee(); break;
                case `Update an Employee's Role`: updateEmployeeRole(); break;
                case `Exit`: db.end(); break;
            }
        })
};

//display table of all departments
const viewDepartment = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser();
    })
};

//display table of all employees
function viewEmployees() {
    const sql = `SELECT employee.*, role.title
    AS job_title, role.salary AS salary
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
};

//display table of all roles
function viewRole() {
    const sql = `SELECT role.*, department.name
    AS department
    FROM role
    LEFT JOIN department
    ON role.department_id = department.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
};

//series of prompts to a new department
const addDepartment = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'dep_name',
                message: 'What is the name of the department?'
            }
        ]).then(response => {
            db.query("INSERT INTO department SET ?", {
                name: response.dep_name
            }, function () {
                promptUser()
            })
        });
};

// update employee's role
const updateEmployeeRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'emp_id',
                message: 'What is the id number of employee?'
            },
            {
                type: 'list',
                name: 'role',
                message: 'What is the new role?',
                choices: ['cook', 'dishwasher', 'waiter', 'bartender', 'barback', 'busser', 'host']
            }
        ]).then(response => {
            db.query("UPDATE employee SET role_id = ? WHERE id = ?",
                [turnRoleIntoID(response.role), response.emp_id]
                , function () {
                    promptUser()
                })
        });
};

// allows role to be entered into db as a foreign key
function turnRoleIntoID(role) {
    if (role == 'cook') {
        return 3;
    }
    else if (role == 'dishwasher') {
        return 4;
    }
    else if (role == 'waiter') {
        return 5;
    }
    else if (role == 'bartender') {
        return 6;
    }
    else if (role == 'barback') {
        return 8;
    }
    else if (role == 'busser') {
        return 9;
    }
    else if (role == 'host') {
        return 10;
    }
}

// allows department to be entered into db as a foreign key
function turnDepartmentIntoID(dep) {
    if (dep == 'FOH') {
        return 1;
    }
    else if (dep == 'BOH') {
        return 2;
    }
};
function turnManagerIntoID(man) {
    if (man == 'John') {
        return 1;
    }
    else if (man == 'Kelly') {
        return 2;
    }
};

// series of prompts to add a new role
const addRole = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'

            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'What department is the role?',
                choices: ['FOH', 'BOH']
            }
        ]).then(response => {
            db.query("INSERT INTO role SET ?", {
                title: response.title,
                salary: response.salary,
                department_id: turnDepartmentIntoID(response.department)
            }, function () {
                promptUser()
            })
        });
};

// series of prompts to add a new employee
const addEmployee = () => {
    return inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: "What is the employee's first name?",
            },
            {
                type: 'input',
                name: 'last_name',
                message: "What is employee's last name?",
            },
            {
                type: 'list',
                name: 'role',
                message: "What is employee's role?",
                choices: ['cook', 'dishwasher', 'waiter', 'bartender', 'barback', 'busser', 'host']
            },
            {
                type: 'list',
                name: 'manager',
                message: "Who is the employee's manager?",
                choices: ['John', 'Kelly']
            }
        ]).then(response => {
            db.query("INSERT INTO employee SET ?", {
                first_name: response.first_name,
                last_name: response.last_name,
                role_id: turnRoleIntoID(response.role),
                manager_id: turnManagerIntoID(response.manager)
            }, function () {
                promptUser()
            })
        });
}

