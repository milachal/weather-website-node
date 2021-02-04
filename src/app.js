const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { handlebars } = require('hbs')
const geocode = require('./utils/geocode')
const weathercode = require('./utils/weathercode')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mila'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Mila'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Mila'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address provided!'
        })
    }

    geocode(req.query.address, (error, data) => {
        if (error) {
           return res.send({ error })
        } 
        weathercode(data.longitude, data.latitude, (error, weatherData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: weatherData,
                location: data.location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('help-error', {
        error: 'Help Page Not Found',
        title: 'Help Page Error',
        name:'Mila'
    })
})

app.get('*', (req, res) => {
    res.render('generic', {
        error: '404 Page Not Found',
        title: '404',
        name: 'Mila'
    })
})


app.listen(port, () => {
    console.log(`Server is up to port ${port}`)
})