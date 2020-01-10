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
            if (answers.nextSection === "Add Department") {
                newDepartmentPrompt();
            }
            if (answers.nextSection === "Add Role") {
                newRolePrompt();
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
    ]
    ).then (
        function (answers) {
            newdep = answers.departmentName;
            console.log("\n-----------------------------------");
            console.log("Adding new department...");
            connection.query(
                "INSERT INTO departments SET ?",
                {dep_name: newdep},
            function(err) {
                if (err) throw err;
                console.log(newdep + " department added!");
                console.log("-----------------------------------\n");
                promptStart();
            })
        }
    )    
}

//Adds new roles to new department.
var newRolePrompt = function () {
    connection.query('SELECT * FROM departments', function (err, res) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    message: 'Please enter new role name:',
                    name: 'newrole'
                },
                {
                    message: 'Please enter new role salary (annual number):',
                    name: 'salary'
                },
                {
                    type: "rawlist",
                    choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].dep_name);
                      }
                      return choiceArray;
                    },
                    message: "Please choose role department:",
                    name: "depid",
                },
            ]
        ).then(
            function (answers) {
                newrl = answers.newrole;
                console.log("\n-----------------------------------");
                console.log("Adding new role...");
                connection.query(
                    "INSERT INTO roles SET ?",
                    {role_name: newrl},
                    {role_salary: answers.salary},
                    {dep_id: answers.depid},
                    function(err) {
                        if (err) throw err;
                        console.log(newrl + " added!");
                        console.log("-----------------------------------\n");
                        promptStart();
                    })
                }
        )
    })
}

//Adds new employee information based on user prompts.
var newEmployeePrompt = function () {
    connection.query('SELECT * FROM roles', function (err, res) {
        if (err) throw err;
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
                    type: "rawlist",
                    choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].role_name);
                      }
                      return choiceArray;
                    },
                    message: "Please choose employee role:",
                    name: "roleid",
                },
            ]
        ).then(
            function (answers) {
                newemp = answers.employeeFirstName;
                console.log("\n-----------------------------------");
                console.log("Adding new employee...");
                connection.query(
                    "INSERT INTO employees SET ?",
                    {first_name: newemp},
                    {last_name: answers.employeeLastName},
                    {role_id: answers.roleid},
                    function(err) {
                        if (err) throw err;
                        console.log(newrl + " added to current employees!");
                        console.log("-----------------------------------\n");
                        promptStart();
                    })
            }
        )
    })
}

//Updates chosen employee role
var updateRole = function () {
    connection.query('SELECT * FROM employees', function (err, res) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    type: "rawlist",
                    choices: function() {
                      var choiceArray = [];
                      for (var i = 0; i < res.length; i++) {
                        choiceArray.push(res[i].first_name + " " + res[i].last_name);
                      }
                      return choiceArray;
                    },
                    message: "Please choose employee to update:",
                    name: "employeeid",
                },
            ]
            ).then( 
                function (answers) {
                    var employee = answers.employeeid;
                    connection.query("SELECT * FROM roles", function (err, res) {
                        if (err) throw err;
                        inquirer.prompt(
                            [
                                {
                                    type: "rawlist",
                                    choices: function() {
                                      var choiceArray = [];
                                      for (var i = 0; i < res.length; i++) {
                                        choiceArray.push(res[i].role_name);
                                      }
                                      return choiceArray;
                                    },
                                    message: "Please choose role to update to:",
                                    name: "roleid",
                                },
                            ]
                        ).then(
                            function (answers) {
                                newrole = answers.roleid;
                                console.log("\n-----------------------------------");
                                console.log("Updating employee...");
                                connection.query(
                                    "UPDATE employees SET {employee} WHERE role_id",
                                    {role_id: newrole},
                                    function(err) {
                                        if (err) throw err;
                                        console.log(employee + " is now a " + newrole);
                                        console.log("-----------------------------------\n");
                                        promptStart();
                                    })
                            }
                        )
                    })
                }
            )
    })
}