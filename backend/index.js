const mongooseconnect = require('./db');
const express = require('express')
const app = express()
var cors = require('cors')


app.use(cors())
const port = 5000
mongooseconnect();


//middleware
const bodyparser = require('body-parser');
// app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json())
// routers
const notesroutes = require('./routers/notes.js');
const authroutes = require('./routers/auth.js');


app.use('/auth', authroutes);
app.use('/notes', notesroutes);


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})