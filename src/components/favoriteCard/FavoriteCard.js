import React from 'react';
import {Card} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCity} from "../../store/actions";
import './favoriteCard.css'

export const FavoriteCard = ({item}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {tempType}= useSelector(state => state.appState)

    const onClickHandler = () => {
        dispatch(setCurrentCity(item))
        history.push('/')
    }

    return (
        <Card onClick={onClickHandler} className='favorite-card'>
            <Card.Body>
                <Card.Img variant="top" src={`./weatherIcons/${item.WeatherIcon}.png`} alt="pic" width={45}/>
                <Card.Title className='d-flex justify-content-center'>{item.cityName}</Card.Title>
                <Card.Text className='d-flex justify-content-center'>
                    {
                        tempType === 'metric'
                            ? <>{item.temperature} &#8451;</>
                            : <>{Math.round((item.temperature * 9/5) + 32)} &#8457;</>
                    }
                </Card.Text>
                <Card.Title className='d-flex justify-content-center'>{item.WeatherText}</Card.Title>
            </Card.Body>
        </Card>
    )
}
