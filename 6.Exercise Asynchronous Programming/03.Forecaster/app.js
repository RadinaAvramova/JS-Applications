function attachEvents() {
    console.log("TODO...");
}

attachEvents();



import { getDomElements, appendNewElements, clearData} from './dom.js';
import { fetchRequest } from './fetch.js';

function attachEvents() {

    const symbols = {
        Sunny: '☀',
        'Partly sunny': '⛅',
        Overcast: '☁',
        Rain: '☂',
        Degrees: '°'
    }
    getDomElements().$btn().addEventListener('click', main);

    function main() {
        const city = getDomElements().$input().value;
        fetchRequest().locationInfo()
            .then(data => findCity(data, city))
            .then(({ code }) => requestCityInfo(code))
            .then(([currentDay, nextDays]) => processInfo(currentDay, nextDays))
            .catch(handleError)
    }
    function findCity(data, city) {
        return data.find((obj) => obj.name === city);
    }
    function requestCityInfo(code) {
        return Promise.all([
            fetchRequest().currentDay(code),
            fetchRequest().nextThreeDays(code)
        ]);
    }
    function processInfo(currentDay, nextDays) {
        getDomElements().$divForecast().style.display = 'block';

        const forecast = currentDayInfo(currentDay);
        clearData(getDomElements().$divCurrent());
        appendNewElements(getDomElements().$divCurrent(), forecast);

        const forecastInfo = upcomingDaysInfo(nextDays);
        clearData(getDomElements().$divUpcoming());
        appendNewElements(getDomElements().$divUpcoming(), forecastInfo);
    }
    function currentDayInfo(day) {
        const deg = degreesTemplate(day.forecast)
        const sym = symbols[day.forecast.condition]

        const divWrapper = createElement('div', ['forecasts']);
        const spanSym = createElement('span', ['condition', 'symbol'], sym);
        const span = createElement('span', ['condition']);
        const spanName = createElement('span', ['forecast-data'], day.name);
        const spanTemp = createElement('span', ['forecast-data'], deg);
        const spanWeather = createElement('span', ['forecast-data'], day.forecast.condition);

        span.append(spanName, spanTemp, spanWeather);
        divWrapper.append(spanSym, span);

        return divWrapper;
    }
    function upcomingDaysInfo(nextDays) {
        const divWrapper = createElement('div', ['forecast-info']);

        nextDays.forecast.forEach(day => {
            const deg = degreesTemplate(day);
            const sym = symbols[day.condition];

            const span = createElement('span', ['upcoming']);
            const spanSym = createElement('span', ['symbol'], sym);
            const spanDeg = createElement('span', ['forecast-data'], deg);
            const spanWeather = createElement('span', ['forecast-data'], day.condition);

            span.append(spanSym, spanDeg, spanWeather);
            divWrapper.appendChild(span);
        });
        return divWrapper;
    }
    function degreesTemplate(obj) {
        return `${obj.low}${symbols.Degrees}/${obj.high}${symbols.Degrees}`;
    }
    function createElement(type, classNames, text) {
        const element = document.createElement(type);
        if (classNames) {
            element.classList.add(...classNames);
        }
        if (text) {
            element.textContent = text;
        }
        return element;
    }
    function handleError(err){
        console.error('Invalid input');
        getDomElements().$divForecast().style.display = 'block';
        const error = createElement('div', ['forecasts'], 'Error!');
        const errorMsg = createElement('div', ['forecasts'], 'Invalid input!');

        clearData(getDomElements().$divCurrent());
        clearData(getDomElements().$divUpcoming());
        appendNewElements(getDomElements().$divCurrent(), error);
        appendNewElements(getDomElements().$divUpcoming(), errorMsg);
    }
}
attachEvents();


function attachEvents() {
    const urlLocations = `https://judgetests.firebaseio.com/locations.json`

    $('#submit').on('click', getWeather);

    function getWeather() {
        let locationToGet = $('#location').val();
        $.get(urlLocations)
            .then(getLocations)
            .catch(error);


        function getLocations(locations) {
            let currentLocationCode;

            for (let locObj of locations) {
                if (locationToGet === locObj.name) {
                    currentLocationCode = locObj.code;
                }
            }

            let todayForecast = $.get(`https://judgetests.firebaseio.com/forecast/today/${currentLocationCode}.json`);
            let upcomingForecast = $.get(`https://judgetests.firebaseio.com/forecast/upcoming/${currentLocationCode}.json`);

            Promise.all([todayForecast, upcomingForecast])
                .then(displayForecast)
                .catch(error);

            function displayForecast([today, upcoming]) {
                $('#forecast').show();

                let currentElement = $('#current');

                currentElement.empty();
                currentElement
                    .append($(' <div class="label">Current conditions</div>'))
                    .append($(`<span>`)
                        .addClass('condition symbol')
                        .html(getSymbol(today.forecast.condition)))
                    .append($('<span>')
                        .addClass('condition')
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(today.name))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .html(`${today.forecast.low}&#176;/${today.forecast.high}&#176;`))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(today.forecast.condition)));

                let upcomingElement = $('#upcoming');
                upcomingElement.empty();

                upcomingElement
                    .append($('<div>')
                        .addClass('label')
                        .text('Three-day forecast'));


                for (let currentUpcoming of upcoming.forecast) {

                    upcomingElement.append($('<span>')
                        .addClass('upcoming')
                        .append($(`<span>`)
                            .addClass('symbol')
                            .html(getSymbol(currentUpcoming.condition)))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .html(`${currentUpcoming.low}&#176;/${currentUpcoming.high}&#176;`))
                        .append($('<span>')
                            .addClass('forecast-data')
                            .text(currentUpcoming.condition)));
                }
            }

        }
    }

    function error(error) {

    }

    function getSymbol(condition) {
        switch (condition) {
            case'Sunny':
                return '&#x2600;';
            case'Partly sunny':
                return '&#x26C5;';
            case'Overcast':
                return '&#x2601;';
            case'Rain':
                return '&#x2614;';
        }
    }

}

attachEvents();