var express = require('express');
var mysql = require('mysql');
var app = express();
const cors = require('cors');
var url = require('url');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors());
app.options('*', cors());


var data = {};

var con = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "admin",
    database: "mydb"
});
var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
    // Create data base
    // con.query("CREATE DATABASE mydb", function (err, result) {
    //     if (err) throw err;
    //     console.log("Database created");
    // });
    // Create table with 2 coloums name and address
    // var sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255))";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("Table created");
    // });
    // Insert a row
    // var sql = "INSERT INTO customers (name, address) VALUES ('Company Inc', 'Highway 37')";
    // con.query(sql, function (err, result) {
    //     if (err) throw err;
    //     console.log("1 record inserted");
    // });
    // query a customer
    // con.query("SELECT * FROM customers", function (err, result, fields) {
    //     if (err) throw err;
    //     console.log(result);
    //     data = result;
    // });
    //res.send("Hello world! Connected");
    
});
app.get('/', function (req, res) {
    
    con.query("SELECT * FROM customers", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    //con.end();
    //next();

});

app.get('/user', function (req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    console.log(query);
    con.query("SELECT * FROM customers WHERE id =" + query.id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    //con.end();
    //next();

});

app.get('/user/:Id', function (req, res) {

    console.log(req.params.Id);
    con.query("SELECT * FROM customers WHERE id =" + req.params.Id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    //con.end();
    //next();
});

/**
 * Add new user
 */
app.post('/user', function (req, res) {

    console.log(req.body);
    con.query("INSERT INTO customers (name, address) VALUES ('" + req.body.name +" ', ' "+ req.body.address +"')", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
    //con.end();
    //next();
});

app.put('/user/:Id', function (req, res) {

    con.query("UPDATE customers SET name ='"+ req.body.name+"', address ='"+ req.body.address+"' WHERE id= '"+ req.params.Id+"'", function (err, result, fields){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

});


app.delete('/user/:Id', function (req, res) {

    console.log(req.params.Id);
    con.query("DELETE FROM customers WHERE id =" + req.params.Id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

});


// app.all('/*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:4401/");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     next();
// });

app.listen(3000);
