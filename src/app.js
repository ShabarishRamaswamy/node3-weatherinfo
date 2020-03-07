const path = require('path')
const express = require('express')
const hbs= require('hbs')
const app = express()
const port = process.env.PORT || 3000
const got = require('got');
const locationFind = require(__dirname+'/utils/locationFind')
const forecast = require(__dirname+'/utils/forecast')
var place_name, coordintes, perciProb, temp, summary
const patialsPath = '../templates/partials/'

//Set up handlebars and views location
app.set('view engine', 'hbs')
app.set('views', 'D:/Programming/firstnode/web-server/templates/views');
hbs.registerPartials(patialsPath)

//Set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('',(req, res)=>{
    res.render('index', {
        title:'Weather Info',
        name: 'Hey'
    })    
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'tomatoes'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        msg:'This is the Help Page',
        title: 'Help Page',
        name: 'Hello'
    })
})
app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            Error: "Please provide with an address"
        })
    }
        locationFind(req.query.address, ({place_name, Coordinates, error}={})=>{
            if (!Coordinates){
                res.send('Please Enter a Valid Location')
            }else{
            forecast(Coordinates[0], Coordinates[1], ({summary, temp, preciProbability}={})=>{
        return res.send({
            Location: place_name, Coordinates, summary, temp, preciProbability})
            })
        }
        })
        // return res.send({
        //     Address: req.query.address
        // })
    
    // res.send({
    //     temp: 30,
    //     humidity: 'medium'
    // })
})

app.get('/products', (req, res)=>{
    if (!req.query.search){
        return res.send({
            error: 'You Must Give Search'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*',(req, res)=>{
    res.render('help_404')
})

app.get('*',(req, res)=>{
    res.render('404')
})

app.listen(port, ()=>{
    console.log('Server is Up on port ' + port)
})
