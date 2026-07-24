export const getWeather = ({ latitude, longitude }, APIkey ) => {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
        ).then((res) => {
            if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Error: ${res.status}`);
        }
    });
};

const getWeatherType = (temperature) => {
    if (temperature >= 86) {
        return "hot";
    }

    if (temperature >= 66) {
        return "warm";
    }

    return "cold";
};

export const filterWeatherData = (data) => {
    const temperatureF = Math.round(data.main?.temp ?? 0);
    const temperatureC = Math.round(((temperatureF - 32) * 5) / 9);

    return {
        city: data.name,
        temp: {
            F: temperatureF,
            C: temperatureC,
        },
        type: getWeatherType(temperatureF),
    };
};
