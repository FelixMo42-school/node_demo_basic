var express    = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()

// Add Connect String Here
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0-cvp0r.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true
})

//set up vars
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

//link to data model and routes
var Cat = require('./cat')
require('./routes')(app);

app.listen(3000, () => {
    console.log('meow')
})
