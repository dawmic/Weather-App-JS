const key = '7e9b63de99326f6abd0038337ba27fac';

const input = document.querySelector('input');


const failFetch = document.querySelector('.failFetch');
input.addEventListener('keydown', setInput);


function setInput(e) {
    if (e.keyCode == 13) {
        getWeatherData(input.value);
        input.value = '';
    }
}



function getWeatherData(userInput) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&units=metric&appid=${key}`)
        .then(response => { return response.json() })
        .then(displayResults)
        .catch(error => {
            document.querySelector('main').classList.add('hide');
            failFetch.classList.remove('failShow');
        });
};

function displayResults(response) {
    document.querySelector('main').classList.remove('hide');
    failFetch.classList.add('failShow');

    const temperature = document.querySelector('.temperature');
    temperature.innerHTML = `${Math.round(response.main.temp)}°<span>C</span>`;

    const city = document.querySelector('.city');
    city.textContent = `${response.name}, ${response.sys.country} `;

    const dateNow = document.querySelector('.date');
    dateNow.textContent = getCurrentDate(new Date());

    const humidity = document.querySelector('.humidity');
    humidity.textContent = 'Humidity ' + response.main.humidity + '%';

    const windSpeed = document.querySelector('.wind-speed');
    windSpeed.textContent = `Wind ${response.wind.speed} m/s`;

    const icon = document.querySelector('.icon');
    icon.setAttribute('src', ` http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`);

    const maxmin = document.querySelector('.max-min-temp');
    maxmin.innerHTML = `${Math.round(response.main.temp_max)}°<span>C</span> / ${Math.round(response.main.temp_min)}°<span>C</span>  Feels like ${Math.round(response.main.feels_like)}°<span>C</span>`;

    const description = document.querySelector('.description');
    description.textContent = response.weather[0].main;


    console.log(response);
    console.log(response.main.temp);

}

function getCurrentDate(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}

window.addEventListener('load', () => {
    getWeatherData('warsaw');
});