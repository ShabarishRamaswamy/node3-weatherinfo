const got = require('got');

const locationFind = async(map_box_url, callback) => {
    try{
        map_box = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(map_box_url) +'.json?access_token=pk.eyJ1IjoibWFnbWFzdHJvbSIsImEiOiJjazZ4b2dndGswZnp1M2ZzNm1qZG9sN2g3In0.qCxrM4l29TOO1NxNA_BeBA&limit=1'
        const response = await got(map_box).json()
        if (!response.features){
            // console.log('Please Enter Correct Location')
            // const error1 = 'Please Enter Correct Location'
        }else{
            data={
                place_name: response.features[0].place_name, 
                Coordinates: response.features[0].center
            }
            callback(data)
        }
        
    }catch(error){
        // if (error.name === 'RequestError'){
        //     console.log('Please check your internet connection')
        // }else{
        //     console.log('Unable to Find the Location')
        // }
        callback(error)
    }
}

module.exports = locationFind