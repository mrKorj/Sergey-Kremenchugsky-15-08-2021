import React, {useEffect} from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {getCurrentWeather, getDailyForecast, getDataFromLocalStorage, getGeolocation, hideAlert, showAlert} from "./store/actions";
import {useDispatch, useSelector} from "react-redux";
import {HomePage} from "./components/homePage/HomePage";
import {FavoritesPage} from "./components/favoritesPage/FavoritesPage";
import {NavBarComponent} from "./components/navBar/NavBarComponent";
import ReactNotification, {store} from 'react-notifications-component';
import {cityByGeolocationUrl, currentConditionsUrl, dailyForecastUrl} from "./localVariables/urls";
import {Loader} from "./components/loader/Loader";
import {FooterComponent} from "./components/footer/FooterComponent";
import 'react-notifications-component/dist/theme.css';
import './App.css';

export const App = () => {
    const {isLoading, theme, favorite, currentCityKey} = useSelector(state => state.appState)
    const alertState = useSelector(state => state.alertState)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataFromLocalStorage(JSON.parse(localStorage.getItem('herolo-weather')) || {}))

        navigator.geolocation.getCurrentPosition(
            position => {
                const {latitude, longitude} = position.coords
                dispatch(getGeolocation(cityByGeolocationUrl({latitude, longitude})))
            },
            error => {
                dispatch(showAlert({
                    message: error.message,
                    type: 'warning',
                    title: 'Allow location to define your city',
                    isShow: true,
                    dismiss: {duration: 0, showIcon: true}
                }))
            })
    }, [dispatch])

    useEffect(() => {
        dispatch(getCurrentWeather(currentConditionsUrl(currentCityKey)))
        dispatch(getDailyForecast(dailyForecastUrl(currentCityKey)))
    }, [currentCityKey, dispatch])

    useEffect(() => {
        localStorage.setItem('herolo-weather', JSON.stringify({theme, favorite}));
    }, [favorite, theme])

    useEffect(() => {
        if (alertState.isShow) {
            store.addNotification({
                title: alertState.title,
                message: alertState.message,
                type: alertState.type,
                insert: "top",
                container: "bottom-left",
                dismiss: alertState.dismiss,
                width: 400,
                onRemoval: () => {
                    dispatch(hideAlert())
                }
            })
        }
    }, [alertState.isShow]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <BrowserRouter>
            <div className={`app ${theme}`}>
                <ReactNotification/>
                {
                    isLoading && <Loader/>
                }
                <NavBarComponent/>
                <div className='container main flex-grow-1'>
                    <Switch>
                        <Route path='/' exact component={HomePage}/>
                        <Route path='/favorite' exact component={FavoritesPage}/>
                    </Switch>
                    <FooterComponent/>
                </div>
            </div>
        </BrowserRouter>
    )
}
