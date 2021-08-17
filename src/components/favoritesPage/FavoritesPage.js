import React from 'react';
import './favoritesPage.css';
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";
import {FavoriteCard} from "../favoriteCard/FavoriteCard";


export const FavoritesPage = () => {
    const favorite = useSelector(state => state.appState.favorite)

    return (
        <div className='favorites-main-section'>
            <div className="favorites-header">
                <h2>Your Favorites</h2>
            </div>
            <Row className="favorites-body">
                {
                    favorite.map(item => (
                        <FavoriteCard key={item.currentCityKey} item={item}/>
                    ))
                }
            </Row>
        </div>
    );
}
