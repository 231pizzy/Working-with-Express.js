const express = require('express');
const path = require('path')
const moment = require('moment')
const logger = require('./middleware/logger')
const app = express()


// Static holder
// app.use(express.static(path.join(__dirname, 'public')));

// INIT BODY-PASER MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MEMBERS API ROUTE
app.use('/api/members', require('./routes/api/members'))


app.use(logger);



const PORT = process.env.PORT || 5000;

// app.get("/", (req, res)=>{
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

app.listen(PORT, ()=>
    console.log(`Server started on ${PORT}`)
);