const request = require('postman-request')

const weathercode = (longitude, latitude, callback) => {
    
    const url = `http://api.weatherstack.com/current?access_key=141d4279f82b05d4a529113c7269651c&query=${latitude},${longitude}`

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to Weather Service!'), undefined
        } else if (response.body.error) {
            callback('Unable to find location'), undefined
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is currently ${response.body.current.temperature} degrees out. The humidity is ${response.body.current.humidity}%.`)       
        }
    })
}

module.exports = weathercode