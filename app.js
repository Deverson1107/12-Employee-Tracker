const inquirer = require("inquirer");

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
                promptStart();
            }
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
            type: 'number',
            message: "Please enter new department id number:",
            name: "departmentid"
        },
        {
            message: "Please enter new department name:",
            name: "departmentName"
        },
        {
            message: "Please enter role in new department:",
            name: "departmentrole"
        },
        {
            type: 'confirm',
            message: "Do you wish to add additonal roles to your new department?",
            name: "continue"
        }
    ]
    ).then (
        function(answers) {
            if (answers.continue === "y") {
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
            type: 'confirm',
            message: "Do you wish to add additional roles to your new department?",
            name: 'continue'
        }
    ]
    ).then(
        function (answers) {
            if (answers.continye === 'y') {
                addingRole();
            }
            else {}
        }
    )
}

//Adds new employee information based on user prompts.
var newEmployeePrompt = function () {
    inquirer.prompt(
    [
        {
            type: 'number',
            message: 'Please enter a new employee id number:',
            name: 'employeeid'
        },
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

