//to use nodemon type    npm run dev    in terminal 
//to push code to git hub type the following commands one by one in command line
// git add .
//git commit -am 'add comments here and include file ie index.js'
// git push

//Stock Market Portfolio App by Penny Cates

const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');


//use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


const PORT = process.env.PORT || 5000;

// API KEY pk_c52fa003e7784fbeb41f5a39b9aef5bb
//creat call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_c52fa003e7784fbeb41f5a39b9aef5bb', {json: true}, (err, res, body) => {
    if (err) {return console.log(err);}
    if (res.statusCode === 200){
        // console.log(body);
        finishedAPI(body);
        };
    });
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

//Set handlebar index GET route
app.get('/', function (req, res) {
    // const api = call_api();
    call_api(function(doneAPI){
            res.render('home', {
            stock: doneAPI
        });
    }, "fb" );
        
});


//Set handlebar index POST route
app.post('/', function (req, res) {
     call_api(function(doneAPI){
            // posted_stuff = req.body.stock_ticker;
            res.render('home', {
            stock: doneAPI,
       });
    }, req.body.stock_ticker);
 });



// creat about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
