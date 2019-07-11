let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");

function insertUser(request, response) {
    let password = request.body.password;
    bcryptjs.hash(password, 10, function(err, hashedPassword) {
        knex('user')
            .insert({
                fname: request.body.fname,
                lname: request.body.lname,
                email:request.body.email,
                phone:request.body.phone,
                username: request.body.username,
                password: hashedPassword
                
            }).then(data => {
                response.json({
                    status: "ok"
                })
            }).catch(error => {
                console.log(error);
                response.json({
                    status: "error"
                });
            })
    });
}


function loginUser(request, response) {
    const username = request.body.username;
    const password = request.body.password;

    knex('user').where({ username: username }).
    then(data => {
        bcryptjs.compare(password, data[0].password, function(err, res) {
            if (res) {
                const token = jwt.sign({username:username},'secret');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ 
                    success: true, 
                    status: 'You are successfully logged in!',
                    accessToken: token
                });
            } else {
                console.log("error")
                response.json({
                    success: false,
                    status: 'incorrect!'
                });
            }
        });

    }).catch(error => {
        console.log(error);
        response.json({
            success: false
        });
    })


}



module.exports = {
    "insertUser": insertUser,
    "loginUser": loginUser
}