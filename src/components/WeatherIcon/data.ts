const O9n = ['015-rain-23.svg', '01-rain-22.svg', '032-rain-17.svg', '052-rain-15.svg',
    '054-rain-14.svg', '058-rain-12-heavy.svg', '080-rain-11.svg', '081-rain-10heavy.svg',
    '084-rain-heavy.svg', '086-rain-light.svg', '099-rain-4.svg', '100-rain-3.svg',
    '104-rain-2.svg', 'rain.svg'];

const O3d = ['036-cloud-broken.svg', '065-cloudy-overcast.svg'];

const O11d = ['020-storm-11.svg', '048-storm-8.svg', '057-storm-7.svg', '068-storm-5.svg',
    '071-storm-3.svg', '083-storm-2.svg', '088-storm-1.svg', '089-storm.svg'];


const WeatherIconMap = {
    '01d': ['109-sun.svg'],
    '01n': ['087-night-clear.svg'],
    '02d': ['059-cloud-2.svg', '062-cloudy-6.svg', '064-cloudy-5.svg',
        '070-cloudy-3.svg', '073-cloudy-2.svg', '077-cloudy-few-1.svg',
        '078-cloudy-few.svg', '106-cloud-few-svg'],
    '02n': ['026-cloudy-night.svg', '075-cloudy-night.svg'],
    '03d': ['036-cloud-broken.svg', '065-cloudy-overcast.svg'],
    '03n': [...O3d, '079-cloud-few-night.svg'],
    '09n': O9n,
    '09d': O9n,
    '10d': ['042-rain-9-day.svg'],
    '10n': O9n,
    '11d': O11d,
    '11n': O11d
};

const fileNameMap = {
    '01d': '01d',
    '01n': '01n',
    '02d': '02d',
    '02n': '02n',
    '03d': '03nd',
    '03n': '03nd',
    '09n': '09nd10n',
    '09d': '09nd10n',
    '10d': '10d',
    '10n': '09nd10n',
    '11d': '11nd',
    '11n': '11nd'
};


export { WeatherIconMap, fileNameMap };
