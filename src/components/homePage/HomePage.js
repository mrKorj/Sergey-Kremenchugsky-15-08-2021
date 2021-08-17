import React, {useEffect, useState} from 'react';
import {SearchComponent} from "../searchComponent/SearchComponent";
import {addToFavorite, removeFromFavorite, showAlert} from "../../store/actions";
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ForecastCardComponent} from "../forecastCard/ForecastCardComponent";
import './homePage.css'

export const HomePage = () => {
    const {theme, cityName, currentWeather, weekForecasts, currentCityKey, favorite, tempType} = useSelector(state => state.appState)
    const dispatch = useDispatch()
    const [inFavorites, setInFavorites] = useState(false)

    useEffect(() => {
        favorite.some(i => i['currentCityKey'] === currentCityKey)
            ? setInFavorites(true)
            : setInFavorites(false)
    }, [currentCityKey, favorite])

    const addToFavoriteHandler = () => {
        const item = {
            cityName,
            currentCityKey,
            temperature: currentWeather.Temperature?.Metric?.Value,
            WeatherText: currentWeather.WeatherText,
            WeatherIcon: currentWeather.WeatherIcon
        }
        dispatch(addToFavorite(item))
        dispatch(showAlert({
            message: 'Added to favorites successfully.',
            type: 'success',
            isShow: true
        }))
    }

    const removeFromFavoriteHandler = () => {
        dispatch(removeFromFavorite(currentCityKey))
        dispatch(showAlert({
            message: 'Removed from favorites successfully.',
            type: 'warning',
            isShow: true
        }))
    }

    return (
        <div className='home-page'>
            <SearchComponent/>
            <div className='current-weather-section'>
                <div className='current-weather-header'>
                    <div className='current-weather-header-left'>
                        <img src={`./weatherIcons/${currentWeather?.WeatherIcon}.png`} alt="pic" className='current-weather-header-left-img'/>
                        <div className='current-weather-header-left-name'>
                            <h3>{cityName}</h3>
                            {
                                tempType === 'metric'
                                    ? <h4>{currentWeather.Temperature?.Metric?.Value} &#8451;</h4>
                                    : <h4>{currentWeather.Temperature?.Imperial?.Value} &#8457;</h4>
                            }
                        </div>
                    </div>
                    <div className='current-weather-header-right'>
                        {
                            inFavorites && <i className="far fa-star favorite-icon"/>
                        }
                        <Button
                            size='sm'
                            onClick={inFavorites ? removeFromFavoriteHandler : addToFavoriteHandler}
                            variant={theme === 'dark' ? 'outline-warning' : 'warning'}
                        >
                            {inFavorites ? 'Remove from favorite' : 'Add to favorite'}
                        </Button>
                    </div>
                </div>
                <div className='current-weather-body'>
                    <h1>{currentWeather?.WeatherText}</h1>
                </div>

                <div className='forecast-section'>
                    <div className='forecast-header'>
                        <p>5-day forecast - <b>{weekForecasts.Headline?.Text}</b></p>
                    </div>
                    <div className='forecast-body'>
                        {
                            weekForecasts.DailyForecasts?.map(data => (
                                <ForecastCardComponent data={data} key={data.EpochDate}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div>
    );
}
