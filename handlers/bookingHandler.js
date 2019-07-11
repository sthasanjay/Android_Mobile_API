let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);

const bcryptjs = require('bcryptjs');
const jwt = require("jsonwebtoken");



function book(req,res){
    if( !req.body.token ) res.json({success:false,status:"No authentication found"})
    else{
        if(!req.body.quantity || req.body.quantity < 1) {
            res.json({success:false,status:"Please provide quantity of atleast 1."})
        }else{
            var values = {
                userid: req.body.userid,
                itemid: req.body.itemid,
                quantity: req.body.quantity,
                price:req.body.price
            };
            
            knex('booking')
            .insert(values)
            .then(
                ()=>{
                    res.json({
                        success : true,
                        status : "Booking success"
                    });
                }
            )
            .catch(error =>{
                res.json(
                    {
                        success:false,
                        status : error
                    }
                )
            })
        }
    }
}


module.exports = {
    book :book
}