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
            choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 
            'Update Employee Role', 'Exit'],
            name: "nextSection"
        },
    ]
    ).then(
        function(answers) {
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
            if (answers.nextSection === "View Roles") {
                console.log("\n-----------------------------------");
                console.log("Current Roles:");
                connection.query(
                    "SELECT * FROM roles" , function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log(
                                res[i].id +
                                " | " +
                                res[i].role_name +
                                " | " +
                                res[i].role_salary +
                                " | " +
                                res[i].dep_id 
                            )
                        }
                    console.log("-----------------------------------\n");
                    promptStart();
                    }
                );
            };
            if (answers.nextSection === "View Employees") {
                console.log("\n-----------------------------------");
                console.log("Current Employees:");
                connection.query(
                    "SELECT * FROM employees" , function(err, res) {
                        if (err) throw err;
                        for (var i = 0; i < res.length; i++) {
                            console.log(
                                res[i].id +
                                " | " +
                                res[i].first_name +
                                " | " +
                                res[i].last_name +
                                " | " +
                                res[i].role_id 
                            )
                        }
                    console.log("-----------------------------------\n");
                    promptStart();
                    }
                );
            };
            if (answers.nextSection === "Add Employee") {
                newEmployeePrompt();
            }
            if (answers.nextSection === "Add Department") {
                newDepartmentPrompt();
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
    ]
    ).then (
        function (answers) {
            newdep = answers.departmentName;
            console.log("\n-----------------------------------");
            console.log("Adding new department...");
            connection.query(
                "INSERT INTO departments SET ?",
                {
                dep_name: newdep
                },
            function(err, res) {
                if (err) throw err;
                console.log(newdep + " department added!");
                console.log("-----------------------------------\n");
                promptStart();
            })
        }
    )    
}

//Adds new roles to new department.
var addingRole = function () {
    inquirer.prompt(
    [
        {
            message: 'Please enter new role name:',
            name: 'newrole'
        },
        {
            message: 'Please enter new role salary:',
            name: 'salary'
        },
        {
            type: 'list',
            message: "Which department will this role be in?",
            choices: [],
            name: "dep"
        }
    ]
    ).then(
        function (answers) {
           
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
            message: 'Please pick employee role:',
            name: 'employeeRole'
        },
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
            message: "Please choose new role for employee:",
            name: 'updatedEmployeeRole',
        }
    ]
    )
}

