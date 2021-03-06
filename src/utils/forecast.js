const got = require('got');

const forecast = async(long, lat, callback)=>{
    try {
        const url = 'https://api.darksky.net/forecast/d3c81eb08240e0f48cde6e7d8133b720/'+encodeURI(lat)+','+encodeURI(long)+'?units=si'
        const response = await got(url).json();
        data = {
            summary: response.daily.data[0].summary,
            temp: response.currently.temperature,
            preciProbability: response.currently.precipProbability,
            humidity: response.currently.humidity
        }
        callback(data)
    } catch (error) {
        // if(error.name=='HTTPError'){
        //     console.log('Please Enter valid set of co-ordinates')
        // }else{
        //     console.log('Check Your Internet Connection!');
        // }
        callback(0, 0, error)
    }
}
module.exports = forecast