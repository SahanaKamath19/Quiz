const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var pg = require('pg');
const authorize = require('./middleware/authorize');


app.use(bodyParser.json());

app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

//Code to communicate between 8080 and 3000 port 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization");
  next();
});

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1', // run on local host
    user     : 'postgres',
    password : 'postgres',
    database : 'quiz',// DB name 
    charset  : 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);

const Account = bookshelf.Model.extend({
    tableName: 'userAccount',
})

//Update the database with user information
app.post('/encrypt', (req, res) => {
    console.log("Details from account" +" "+req.body.name +" "+req.body.email +" "+ req.body.password);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            //Add record to database with hashed password
        const newAccount = new Account({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            })
            newAccount.save()
            .then(account => {
            console.log(account)
        })
    res.send("Update Account");
        });
    });
});

app.post('/', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    Account 
    .where({email : email})
    .fetch()
    .then(account=>{
        console.log(account.attributes);
        bcrypt.compare(password, account.attributes.password.toString(), function(err, result) {
            if(result){
				//sign a token in successful login and send to client side
                let token = jwt.sign({email:email},'accountKey');
                res.json({token:token});
            }
            else{
                res
                .status(403)
                .send({token:null});
            }
        });
     })
})

app.get('/quizHome', authorize, (req,res) => {
    console.log(req);
    res.json(req.decoded.name);
    //res.send(req.decoded.username);
});
