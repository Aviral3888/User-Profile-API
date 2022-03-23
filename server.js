require('./models/db');


const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyparser = require('body-parser');

const userController = require('./controllers/userController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({
        extname: 'hbs', 
        defaultLayout: 'mainLayout',
        layoutsDir: __dirname + '/views/layouts/'
    }));
app.set('view engine', 'hbs');

// Listen to Port
app.listen(3000, () => {
    console.log('Express started at port: 3000');
});

app.use('/user', userController);