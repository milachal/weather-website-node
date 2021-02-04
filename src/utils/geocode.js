const request = require('postman-request')

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWl3aXciLCJhIjoiY2traHpxcXIzMGo4bjJ2cGd2c3doZ2w1eSJ9.u1yRso6SK4Jl3hbVlL1IlA&limit=1`
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!'), undefined
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try again with different search term.'), undefined
        } else {
            callback(undefined, {
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode