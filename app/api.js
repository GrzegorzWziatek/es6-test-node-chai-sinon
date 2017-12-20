const fetch = require("node-fetch");

/*
 * Gets weather info for specified city
 */
export async function getWeatherData(city){
    const url = 'http://api.openweathermap.org/data/2.5/weather?appid=903cb5f008420dd10ed453c37c619d74&units=metric&q=' +
        encodeURIComponent(city);

    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        // console.log(error);
    }
}