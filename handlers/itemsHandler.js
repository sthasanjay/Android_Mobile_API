let mysql = require('mysql');
let config = require('../knexfile');

let conn = mysql.createConnection(config.connection);
const knex = require('knex')(config);


function addItem(request, response) {
    console.log(response.body);
    knex('items')
        .insert({
            name: request.body.name,
            module: request.body.module,
            imageName: request.body.imageName,
            price: request.body.price,
            size:request.body.size,
            ram:request.body.ram,
            rom:request.body.rom,
            os:request.body.os,
            fcamera:request.body.fcamera,
            bcamera:request.body.bcamera

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
}

function fetchItem(request, response) {
    knex.select('*').from('items').
    then(data => {
        response.json(data
        )
    }).catch(error => {
        console.log(error);
        response.json({
            status: "error"
        });
    })
}

function getItemByName(req, res){
    knex
    .select()
    .table('items')
    .where('name','like',req.params.itemName+"%")
    .then((data)=>{
        res.json(data)
    })

}


function getItemById(req, res){
    knex
    .select()
    .table('items')
    .where('id',req.params.itemId)
    .then((data)=>{
        res.json(data[0])
    })

}

function updateItem(req,res){
    console.log(req.body);
    var values = {
        name : req.body.name,
        module: req.body.module,
     
        price : req.body.price,
        size : req.body.size,
        ram : req.body.ram,
        rom : req.body.rom,
        os : req.body.os,
        fcamera:req.body.fcamera,
        bcamera:req.body.bcamera
    };

    knex('items')
    .update(values)
    .where('id',req.params.itemId)
    .then(data=>{
        res.end('Item Updated');
    })
    .catch(er=>{
        res.end('error')
    })

}



function deleteItem(req,res){
    knex('items')
    .delete()
    .where('id',req.params.itemId)
    .then(data=>{
        res.end("Item deleted")
    })
    .catch(er=>{
        res.end("error")
    })
}




module.exports = {
    "addItem": addItem,
    "fetchItem": fetchItem,
    "getItemByName" : getItemByName,
    "getItemById":getItemById,
    "updateItem":updateItem,
    "deleteItem" : deleteItem

}
