'use strict';
const express = require('express')
const app = express();
const cors = require('cors')
const monk = require('monk')
// connect mongo db to online local machine called mewoer
const db = monk('localhost/meower')
// creates a collection inside our database
const mews = db.get('mews')

// any request made from server goes through cors and get headers from cors
app.use(cors());
//body parser middleware. incoming req on content type app json
app.use(express.json());


// checks that '/ rout works in localhost
app.get('/', (req, res)=>{
    res.json({
        message: 'was up'
    })
})
// when server receives a get request to /mew get records from db and respond with array
app.get('/mews', (req, res)=>{
    mews
        .find() //find things in db
        .then(mews =>{
            // respond with db array
            res.json(mews)
        })
})
function isValidMew(mew){
    
    // validate whether content and name are sent through req
    return mew.name && mew.name.toString().trim() !== '' &&
    mew.content && mew.content.toString().trim() !== ''; 
}

app.post('/mews', (req, res)=>{
    // stop people from hitting submit without typing a message
    // we validate to make sure bad stuff doesn't get into the db
    // creates the obj
    if(isValidMew(req.body)){
        const mew = {
        name: req.body.name.toString(),
        content: req.body.content.toString(),    
        created: new Date()
    };
    console.log(mew)
    // inserts the collection 
    // then responds with the data that was inserted
    mews
    .insert(mew)
    .then(createdMew =>{
        res.json(createdMew)
    })
    } else {
        res.status(422);
        res.json({
            message: 'HEY! Name and content required please'
        })
    }
})

app.listen(5000,()=>{
    console.log('listening on 5000')
})