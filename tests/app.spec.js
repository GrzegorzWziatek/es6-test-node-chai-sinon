import * as app from '../app/app';
import * as api from '../app/api';

const expect = require('chai').expect;
const sinon = require('sinon');

describe('App.js test', () => {

    describe('Check temperature messages ranges', () => {
        it('Temperature not specified', () => {
            const message = app.getTemperatureMessage();

            expect(message).to.equal(app.TEMPERATURE_ERROR);
        });

        it('Temperature below 0', () => {
            const message = app.getTemperatureMessage(-20);

            expect(message).to.equal(app.TEMPERATURE_FREEZING);
        });

        it('Temperature in range 0-10', () => {
            const message = app.getTemperatureMessage(5);

            expect(message).to.equal(app.TEMPERATURE_COLD);
        });

        it('Temperature in range 10-30', () => {
            const message = app.getTemperatureMessage(27);

            expect(message).to.equal(app.TEMPERATURE_OK);
        });

        it('Temperature above 30 degrees', () => {
            const message = app.getTemperatureMessage(100);

            expect(message).to.equal(app.TEMPERATURE_HOT);
        })
    });

    describe('getWeatherInfo method ', () => {
        let weatherApiCallStub;
        beforeEach(() => {
            const resp = { main: { temp: 10 }};
            weatherApiCallStub = sinon.stub(api, 'getWeatherData')
                .callsFake( () => { return Promise.resolve(resp)});
        });

        afterEach(() => {
            weatherApiCallStub.restore();
        });

        it('getWeatherInfo with city specified', async() => {
            const message = await app.getWeatherInfo('Krakow');

            sinon.assert.called(weatherApiCallStub);
            expect(message).to.equal(app.TEMPERATURE_OK);

        });

        it('getWeatherInfo without city specified', async() => {
            const message = await app.getWeatherInfo();

            expect(message).to.equal(app.NO_CITY);
            expect(weatherApiCallStub.called).to.equal(false);
        })
    })
});
