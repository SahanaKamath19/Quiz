const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var pg = require('pg');
const authorize = require('./middleware/authorize');


app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded 
app.use(express.static('build'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Server Started on '+ PORT);
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
    score: function(){
        return this.hasMany(Score);
    }
})

const Admin = bookshelf.Model.extend({
    tableName: 'adminUser',
})

const Score = bookshelf.Model.extend({
    tableName: 'scoreCard',
    userAccount: function() {
        return this.belongsTo(Account,'user_id')
    }
})

const Question = bookshelf.Model.extend({
    tableName: 'question',
})

//login verification for users
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


//Update the database with admin information 
app.post('/admin/encrypt', (req, res) => {
    console.log("Details from admin" +" "+req.body.name +" "+req.body.email +" "+ req.body.password);
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) throw err;
            //Add record to database with hashed password
        const newAdmin = new Admin({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            })
            newAdmin.save()
            .then(admin => {
            console.log(admin)
        })
    res.send("Update Admin User");
        });
    });
});



//login verification for admins
app.post('/adminLogin', (req,res) => {
    let email = req.body.email;
    let password = req.body.password;
    Admin 
    .where({email : email})
    .fetch()
    .then(admin=>{
        console.log(admin.attributes);
        bcrypt.compare(password, admin.attributes.password.toString(), function(err, result) {
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
  .send("Admin not found");
});
})

// Function that returns admin information 
app.get('/adminDetails', authorize, (req,res) => {
    let email = req.decoded.email;
    Admin
    .where({email :email})
    .fetch()
    .then(admin=>{
         res.json(admin.attributes);
         //res.json(account.attributes.name);
        //console.log(account.attributes.name);
    })
});

// Function that returns user account information 
app.get('/quizHome', authorize, (req,res) => {
    let email = req.decoded.email;
    Account 
    .where({email :email})
    .fetch()
    .then(account=>{
         res.json(account.attributes);
         //res.json(account.attributes.name);
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

// Function to fetch all score history for one particular user 
app.post('/scores', (req, res) => {
    //console.log(req.body.id);
    Score
    .where({user_id:req.body.id})
	.fetchAll()
	.then(score => {
        res.json(score.models.map(score => score.attributes));
        //console.log(score.models.map(score => score.attributes))
	})
});

// Function to add score to DB when user finishes the test or when the timer hits zero
app.post('/score', (req, res) => {
     const newScore = new Score({
           score: req.body.state.correctScore,
           recent_score: true,
           user_id: req.body.state.id
            })
            newScore.save()
            .then(score => {
            console.log(score)
        })
     res.send("Update Score");
});

//Function to update value of previous quiz result to false everytime user takes the quiz
app.post('/scoreSet',(req,res)=>{
    const attributesToUpdate = {
    recent_score: false
    }
    Score.where({user_id: req.body.state.id})
    .save(attributesToUpdate, {patch: true})
    .then(score => {
        console.log(score.attributes)
    })
    res.send("Update recent_score");
})

//Function to get all the questions with complexity 1
app.get('/complexityOneQuestion',(req,res) => {
    Question
    .where({question_complexity :1})
    .fetchAll()
    .then(questions => {
        res.json(questions.models.map(questions => questions.attributes));
        //console.log(questions.models.map(questions => questions.attributes));
	})
});

//Function to get all the questions with complexity 2
app.get('/complexityTwoQuestion',(req,res) => {
    Question
    .where({question_complexity :2})
    .fetchAll()
    .then(questions => {
        res.json(questions.models.map(questions => questions.attributes));
        //console.log(questions.models.map(questions => questions.attributes));
	})
});

//Function to get all the questions with complexity 3
app.get('/complexityThreeQuestion',(req,res) => {
    Question
    .where({question_complexity :3})
    .fetchAll()
    .then(questions => {
        res.json(questions.models.map(questions => questions.attributes));
        //console.log(questions.models.map(questions => questions.attributes));
	})
});

//Function returns top 10 users with highest score
app.get('/highestScore',(req,res)=>{
    Score
    .where({recent_score:true})
    .query('limit','10')
    .orderBy('score','DESC')
    .fetchAll({withRelated:['userAccount'],require:true})
    .then(score=>{
        //console.log(score.models[0].relations.userAccount.attributes);
        //res.json(score.models.map(score => score.attributes));
        //console.log(score.models.map(score => score.relations.userAccount.attributes));
        res.json(score);
        console.log(res.score);
    })
})

//Function to delete question from DB
app.delete('/deleteQuestion/:id',(req,res)=>{
    console.log(req.params.id);
Question
.where({id: req.params.id})
.destroy()
.then(()=>{
    res.send("deleted question" + req.params.id);
})
})

app.get('*', function(req, res) {
    res.sendFile((__dirname+'/build/index.html'));
});