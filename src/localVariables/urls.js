import {API_KEY} from "./apiKey";

export const cityByGeolocationUrl = ({latitude, longitude}) =>
    `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${API_KEY}&q=${latitude},${longitude}`


export const currentConditionsUrl = cityKey => `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${API_KEY}`


export const dailyForecastUrl = cityKey => `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${API_KEY}&metric=true`


export const autocompleteSearchUrl = value => `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value}`

