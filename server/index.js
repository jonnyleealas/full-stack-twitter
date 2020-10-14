'use strict';
const express = require('express')
const app = express();

// checks that '/ rout works in localhost
app.get('/', (req, res)=>{
    res.json({
        message: 'was up'
    })
})
app.listen(4000,()=>{
    console.log('listening on 4000')
})