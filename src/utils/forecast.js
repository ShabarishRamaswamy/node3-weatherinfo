const got = require('got');

const forecast = async(long, lat, callback)=>{
    try {
        const url = 'https://api.darksky.net/forecast//'+encodeURI(lat)+','+encodeURI(long)+'?units=si'
        const response = await got(url).json();
        data = {
            summary: response.daily.data[0].summary,
            temp: response.currently.temperature,
            preciProbability: response.currently.precipProbability
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