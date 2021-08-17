import React from 'react';
import {Card} from "react-bootstrap";
import './forecastCardComponent.css';
import {useSelector} from "react-redux";

export const ForecastCardComponent = ({data}) => {
    const {tempType}= useSelector(state => state.appState)

    return (
        <>
            <Card className='forecast-card'>
                <Card.Body className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={`././weatherIcons/${data.Day.Icon}.png`} alt="icon" width={45}/>
                    <Card.Title className='d-flex justify-content-center'>{new Date(data.Date).toLocaleString("default", { weekday: "short" })}</Card.Title>
                    <Card.Text className='d-flex justify-content-center'>
                        {
                            tempType === 'metric'
                                ? <>{data.Temperature?.Maximum?.Value} &#8451;</>
                                : <>{Math.round((data.Temperature?.Maximum?.Value * 9/5) + 32)} &#8457;</>
                        }
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    );
};
