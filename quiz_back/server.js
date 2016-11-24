const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var pg = require('pg');
const authorize = require('./middleware/authorize');


app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded 

app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});

//Code to communicate between 8080 and 3000 port 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization"); // Add authorization
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


const Question = bookshelf.Model.extend({
    tableName: 'question',
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
     }).catch(function(err) {
  console.error(err);
  res.status(403)
  .send("Account not found");
});
})

app.get('/quizHome', authorize, (req,res) => {
    let email = req.decoded.email;
    Account 
    .where({email :email})
    .fetch()
    .then(account=>{
        res.json(account.attributes.name);
        //console.log(account.attributes.name);
    })
});

//Function to get questions from DB 
app.post('/questions',(req,res)=>{
    console.log(req.body.questionRequest);
Question
    .where({id :req.body.questionRequest})
	.fetch()
	.then(question => {
        res.json(question.attributes)
		console.log(question.attributes);
        //console.log(JSON.parse(question.attributes.options));
	})
})

//Function to add record to DB using postman
app.post('/question', (req, res) => {
    console.log(req.body);
    const newQuestion = new Question({
        question_description:req.body.question_description,
        correct_answer:req.body.correct_answer,
        question_complexity:req.body.question_complexity,
        options:req.body.options
    })
    newQuestion.save()
        .then(question => {
            console.log(question)
        })
        res.send("Update Question");
});