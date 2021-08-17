import {actionTypes} from "../actionTypes";
import {mockData} from "../mockData";

const initialState = {
    isLoading: false,
    theme: 'dark',
    currentCityKey: 215854, // Tel Aviv
    cityName: 'Tel Aviv',
    geolocation: null,
    tempType: 'metric',
    favorite: [],
    currentWeather: mockData.currentWeather,
    weekForecasts: mockData.weekForecasts
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOW_LOADER: {
            return {...state, isLoading: true}
        }
        case actionTypes.HIDE_LOADER: {
            return {...state, isLoading: false}
        }
        case actionTypes.CHANGE_THEME: {
            return {...state, theme: action.payload}
        }
        case actionTypes.CHANGE_TEMPERATURE_TYPE: {
            return {...state, tempType: action.payload}
        }
        case actionTypes.GET_DATA_FROM_LOCALSTORAGE: {
            return {...state, ...action.payload}
        }
        case actionTypes.SET_GEOLOCATION: {
            return {...state, geolocation: action.payload, currentCityKey: action.payload.Key, cityName: action.payload.EnglishName}
        }
        case actionTypes.SET_CURRENT_CITY: {
            return {...state, currentCityKey: action.payload.currentCityKey, cityName: action.payload.cityName}
        }
        case actionTypes.SET_CURRENT_WEATHER: {
            return {...state, currentWeather: action.payload[0]}
        }
        case actionTypes.SET_DAILY_FORECAST: {
            return {...state, weekForecasts: action.payload}
        }
        case actionTypes.ADD_TO_FAVORITE: {
            return {...state, favorite: [action.payload, ...state.favorite]}
        }
        case actionTypes.REMOVE_FROM_FAVORITE: {
            const favorite = state.favorite.filter(item => item.currentCityKey !== action.payload)
            return {...state, favorite}
        }
        default:
            return state
    }
}
