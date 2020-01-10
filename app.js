const inquirer = require("inquirer");
var mysql = require("mysql");

//setting up sql server
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "kaiju0790",
    database: "employee_db",
  });

//initial prompt. Moves user to a number of different actions.
var promptStart = function () {
    inquirer.prompt(
    [
        {
            type: "list",
            message: "What would you like to do?:",
            choices: ['View Departments', 'View Employees', 'Add Department', 'Add Employee', 'Update Employee Role', 'Exit'],
            name: "nextSection"
        },
    ]
    ).then(
        function(answers) {
            if (answers.nextSection === "View Employees") {
                promptStart();
            }
            if (answers.nextSection === "View Departments") {
                console.log("\n-----------------------------------");
                console.log("Current Departments:");
                connection.query(
                    "SELECT * FROM departments" , function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log(
                                res[i].id +
                                " | " +
                                res[i].dep_name
                            )
                        }
                    console.log("-----------------------------------\n");
                    promptStart();
                    }
                );
            };
            if (answers.nextSection === "Add Department") {
                newDepartmentPrompt();
            }
            if (answers.nextSection === "Add Employee") {
                newEmployeePrompt();
            }
            if (answers.nextSection === "Update Employee Role") {
                updateRole();
            }
            if (answers.nextSection === "Exit") {
                connection.end();
            }
        }        
    );
}
promptStart();

//Adds new department information based on user prompts.
var newDepartmentPrompt = function () {
    inquirer.prompt(
    [
        {
            message: "Please enter new department name:",
            name: "departmentName"
        },
        {
            message: "Please enter role in new department:",
            name: "departmentrole"
        },
        {
            type: 'list',
            message: "Do you wish to add additonal roles to your new department?",
            choices: ['Yes', 'No'],
            name: "continue"
        }
    ]
    ).then (
        function(answers) {
            if (answers.continue === "Yes") {
                addingRole();
            }
            else {
                promptStart();
            }
        }
    )
}

//Adds new roles to new department.
var addingRole = function () {
    inquirer.prompt(
    [
        {
            message: 'Please enter additonal role:',
            name: 'newrole'
        },
        {
            type: 'list',
            message: "Do you wish to add additonal roles to your new department?",
            choices: ['Yes', 'No'],
            name: "continue"
        }
    ]
    ).then(
        function (answers) {
            if (answers.continue === 'Yes') {
                addingRole();
            }
            else {
                promptStart();
            }
        }
    )
}

//Adds new employee information based on user prompts.
var newEmployeePrompt = function () {
    inquirer.prompt(
    [
        {
            message: "Please enter employee first name:",
            name: 'employeeFirstName'
        },
        {
            message: 'Please enter employee last name:',
            name: 'employeeLastName'
        },
        {
            type: 'list',
            choices: [],
            message: 'Please pick employee department:',
            name: 'employeeDepartment'
        },
        {
            type: 'list',
            choices: [],
            message: 'Please pick employee role:',
            name: 'employeeRole'
        },
        {
            type: 'number',
            message: 'Please enter employee salary:',
            name: 'employeeSalary'
        }
    ]    
    )
}

//Updates chosen employee role
var updateRole = function () {
    inquirer.prompt(
    [
        {
            type: 'list',
            choices: [],
            message: "Please choose an employee to update:",
            name: 'employeeChoice'
        },
        {
            type: 'list',
            choices: [],
            message: "Pick a new department for chosen employee:",
            name: 'updatedDepartment'
        },
        {
            type: 'list',
            choices: [],
            message: "Please choose new role for employee:",
            name: 'updatedEmployeeRole',
        }
    ]
    )
}

