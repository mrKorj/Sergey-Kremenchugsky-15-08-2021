export const mockData = {
    currentWeather: {
        "WeatherText": "Sunny",
        "WeatherIcon": 1,
        "Temperature": {"Metric": {"Value": 34.9}, "Imperial": {"Value": 95}}
    },
    weekForecasts: {
        "Headline": {"Text": "Mostly sunny this weekend"},
        "DailyForecasts": [
            {
                "Date": "2021-08-16T07:00:00+03:00",
                "EpochDate": 1629345600,
                "Temperature": {"Maximum": {"Value": 34.9}},
                "Day": {"Icon": 1}
            },
            {
                "Date": "2021-08-17T07:00:00+03:00",
                "EpochDate": 1629432000,
                "Temperature": {"Maximum": {"Value": 30.9,}},
                "Day": {"Icon": 1}
            },
            {
                "Date": "2021-08-18T07:00:00+03:00",
                "EpochDate": 1629086400,
                "Temperature": {"Maximum": {"Value": 30.4,}},
                "Day": {"Icon": 1}
            },
            {
                "Date": "2021-08-19T07:00:00+03:00",
                "EpochDate": 1629172800,
                "Temperature": {"Maximum": {"Value": 30.2}},
                "Day": {"Icon": 1}
            },
            {
                "Date": "2021-08-20T07:00:00+03:00",
                "EpochDate": 1629259200,
                "Temperature": {"Maximum": {"Value": 30.9}},
                "Day": {"Icon": 1}
            }
        ]
    }
}
