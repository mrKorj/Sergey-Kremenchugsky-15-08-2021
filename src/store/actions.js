import {actionTypes} from "./actionTypes";
import axios from "axios";

axios.defaults.validateStatus = (status) => status >= 200

export const showAlert = (alertObj) => {
    return {
        type: actionTypes.SHOW_ALERT,
        payload: alertObj
    }
}

export const hideAlert = () => {
    return {type: actionTypes.HIDE_ALERT}
}

export const changeTheme = (theme) => {
    return {
        type: actionTypes.CHANGE_THEME,
        payload: theme
    }
}

export const setCurrentCity = (city) => {
    return {
        type: actionTypes.SET_CURRENT_CITY,
        payload: city
    }
}

export const addToFavorite = (city) => {
    return {
        type: actionTypes.ADD_TO_FAVORITE,
        payload: city
    }
}
export const removeFromFavorite = (city) => {
    return {
        type: actionTypes.REMOVE_FROM_FAVORITE,
        payload: city
    }
}

export const getDataFromLocalStorage = (data) => {
    return {
        type: actionTypes.GET_DATA_FROM_LOCALSTORAGE,
        payload: data
    }
}

export const changeTemperatureType = (type) => {
    return {
        type: actionTypes.CHANGE_TEMPERATURE_TYPE,
        payload: type
    }
}

export const getGeolocation = (url) => {
    return async dispatch => {
        await fetchData({
            dispatch,
            actionType: actionTypes.SET_GEOLOCATION,
            url
        })
    }
}

export const getCurrentWeather = (url) => {
    return async dispatch => {
        await fetchData({
            dispatch,
            actionType: actionTypes.SET_CURRENT_WEATHER,
            url
        })
    }
}

export const getDailyForecast = (url) => {
    return async dispatch => {
        await fetchData({
            dispatch,
            actionType: actionTypes.SET_DAILY_FORECAST,
            url
        })
    }
}

async function fetchData({dispatch, actionType, method = 'GET', url, data = null}) {
    dispatch({type: actionTypes.SHOW_LOADER})
    try {
        const res = await axios({method, url, data})
        dispatch({
            type: actionType,
            payload: res.data
        })
        dispatch({type: actionTypes.HIDE_LOADER})
    } catch (e) {
        dispatch({type: actionTypes.HIDE_LOADER})
        dispatch(showAlert({
            message: e.message,
            type: 'danger',
            title: 'Something went wrong',
            isShow: true
        }))
    }
}
