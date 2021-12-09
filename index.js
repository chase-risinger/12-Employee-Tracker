// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const db = require('./db/connection');
// const fs = require('fs');
// const generateHTML = require('./src/generateHTML.js');
// const { writeFile, copyFile } = require('./src/generate-site');
// TODO: Create an array of questions for user input




db.connect(err => {
    if (err) {
        throw error
    }

    console.log('this is running')
    promptUser();
});

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
                case `Exit`: connection.end(); break;
            }
        })
};


const viewDepartment = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser();
    })
};

function viewEmployees() {
    const sql = `SELECT employee.*, role.title
    AS job_title
    FROM employee
    LEFT JOIN role
    ON employee.role_id = role.id`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
};

function viewRole() {
    db.query("SELECT * FROM role;", (err, res) => {
        if (err) throw err;
        console.table(res)
        promptUser()
    })
};

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

function turnDepartmentIntoID(dep) {
    if (dep == 'FOH') {
        return 1;
    }
    else if (dep == 'BOH') {
        return 2;
    }
}

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
                role_id: 5,
                manager_id: 1
            }, function () {
                promptUser()
            })
        });
}












/*

function viewDepartments() {
    db.query("SELECT * FROM department;", (err, res) => {
        if (err) {
            throw err
        }
        console.log('hey')
        console.table(res)
        promptUser()
    })
};

function viewRoles() {
    db.query("SELECT * FROM role;", (err, res) => {
        if (err) {
            throw err
        }
        console.table(res)
        promptUser()
    })
}

const promptUser = () => {
    return inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: "What would you like to do?",
                choices: ["view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role"]
            }
        ]).then(
            response => {
                switch (response.choice) {
                    case "view all departments":
                        viewDepartments();
                        break
                    case "view all roles":
                        viewRoles();
                        break
                    default: db.end
                }
            }
        )
}

const promptEmployeeInfo = () => {
    if (!promptEmployeeInfo.roster) {
        promptEmployeeInfo.roster = []
    }
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
            },
            {
                type: 'confirm',
                name: 'another',
                message: 'Would you like to add another member?',
                default: false
            }
        ])
        .then(teamData => {
            promptEmployeeInfo.roster.push(teamData);
            if (teamData.another) {
                return promptEmployeeInfo();
            }
            else {
                return promptEmployeeInfo.roster;
            }
        })
}; */


// promptUser()

/* .then(
    promptEmployeeInfo()).then(employeeData => {
        employeeData.forEach(element => {
            delete element.another;
            if (element['manager'] == 'Kelly') {
                element['manager'] = 2;
            }
            else if (element['manager'] == 'John') {
                element['manager'] = 1;
            };
            if (element['role'] == 'cook') {
                element['role'] = 3;
            }
            else if (element['role'] == 'dishwasher') {
                element['role'] = 4;
            }
            else if (element['role'] == 'waiter') {
                element['role'] = 5;
            }
            else if (element['role'] == 'bartender') {
                element['role'] = 6;
            }
            else if (element['role'] == 'barback') {
                element['role'] = 8;
            }
            else if (element['role'] == 'busser') {
                element['role'] = 9;
            }
            else if (element['role'] == 'host') {
                element['role'] = 10;
            }
        })

        console.log(employeeData)
    }) */

