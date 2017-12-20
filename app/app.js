import {getWeatherData} from './api'

export const TEMPERATURE_FREEZING = 'Temperature is below 0, remember to take coat and scarf!';
export const TEMPERATURE_COLD = 'Temperature is below 10, remember to take coat!';
export const TEMPERATURE_OK = 'Temperature is ok today';
export const TEMPERATURE_HOT = 'Warning! Temperature is above 30 degrees, watch for sunburn!';
export const TEMPERATURE_ERROR = 'API Error. Wrong temperature specified';
export const NO_CITY = 'No city specified';

export const getWeatherInfo = async(city) => {
    if (!city) {
        return NO_CITY;
    }

    const weather = await getWeatherData(city);
    return getTemperatureMessage(weather.main.temp);
};


export const getTemperatureMessage = (temperature) => {
    if (temperature === undefined) {
        return TEMPERATURE_ERROR;
    }
    switch (true) {
        case (temperature < 0):
            return TEMPERATURE_FREEZING;
            break;
        case (temperature < 10):
            return TEMPERATURE_COLD;
            break;
        case (temperature < 30):
            return TEMPERATURE_OK;
            break;
        case (temperature >= 30):
            return TEMPERATURE_HOT;
            break;
        default:
            return TEMPERATURE_ERROR;
    }
};

async function main() {
    const message = await getWeatherInfo('Krakow');
    console.log(message)
}
main();


