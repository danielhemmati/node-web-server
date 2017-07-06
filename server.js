const express = require('express');
const hbs     = require('hbs'); 
const fs      = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// configuration that tell us to use hbs
app.set('view engine', 'hbs');


// middleware ===> app.use is the middleware because it tells to expree first pass this level (LOL)
app.use(function(req, res, next){
    var now = new Date().toString();
    // this code below is mine don't touch it ... lol
    var fullURL = req.protocol + '://' + req.get('host') + req.originalUrl;

    var log = `${now} ${req.method} ${req.url} ${req.ip} ${req.hostname} ${req.originalUrl}
    ${fullURL}`;
    console.log(log)
    fs.appendFile('sercer.log', log + '\n', function(error){
        if(error){
            console.log('unalbe to connet to sercer.log');
        }
    })
    next();
});

// app.use(function(req, res, next){
//     res.render('maintenance.hbs')
// })
// there is the reason that we put it here and i write in the word and the video 6.express middlware
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function(){
    // whatever you return here will be show in the browser and we test it in the video 5
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', function(text){
    return text.toUpperCase();
});

app.get('/', function(req, res){
    res.render('home.hbs', {
        pageTitile: 'home page',
        welcomeMessage: 'welcome to my gorgeous webSite'
    })
});

app.get('/about', function(req, res){
    res.render('about.hbs',{
        pageTitile: 'About Page'
    });
});

app.get('/projects', function(req, res){
    res.render('projects.hbs', {
        pageTitile: 'Projects'
    });
});

app.get('/bad', function(req ,res){
    res.send({
        errorMessage:'Unable to handle request'
    })
})

app.listen(3000, function(){
    console.log('server is up on the port 3000');
});