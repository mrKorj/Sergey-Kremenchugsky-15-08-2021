import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCity, showAlert} from "../../store/actions";
import {autocompleteSearchUrl} from "../../localVariables/urls";
import AsyncSelect from 'react-select/async';
import axios from "axios";
import './searchComponent.css'

export const SearchComponent = () => {
    const dispatch = useDispatch()
    const theme = useSelector(state => state.appState.theme)
    const [notAllowed, setNotAllowed] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null);
    const timeoutId = useRef(null)
    const timeout = 800

    const customStyles = {
        input: base => ({
            ...base,
            color: theme === 'dark' && "#fff"
        }),
        singleValue: base => ({
            ...base,
            color: theme === 'dark' && "#fff"
        }),
        control: (base, state) => ({
            ...base,
            color: theme === 'dark' && '#fff',
            backgroundColor: theme === 'dark' && "#343a40",
            borderColor: theme === 'dark' ? "black" : "#cccccc",
            boxShadow: state.isFocused ? null : null,
            "&:hover": {}
        }),
        menu: base => ({
            ...base,
            background: theme === 'dark' && "#343a40",
        }),
        option: (styles, {data, isDisabled, isFocused, isSelected}) => ({
            ...styles,
            backgroundColor: isFocused ? theme === 'dark' ? "#8a2be2" : '#c7a0ea' : null,
        })
    };

    const handleChange = value => {
        setSelectedValue(value)
        dispatch(setCurrentCity({currentCityKey: value.key, cityName: value.name}))
    }


    const loadOptions = (inputValue, callback) => {
        if (!inputValue) return

        if (new RegExp(/[^a-zA-Z\d]/ig).test(inputValue) || !new RegExp(/^[^0-9]+$/).test(inputValue)) {
            setNotAllowed(true)
            return
        } else {
            setNotAllowed(false)
        }

        if (inputValue.length > 2) {
            clearTimeout(timeoutId.current)
            timeoutId.current = setTimeout(async () => {
                try {
                    const res = await axios.get(autocompleteSearchUrl(inputValue))
                    callback(res.data.map(i => ({key: i.Key, name: i.LocalizedName})))
                } catch (e) {
                    dispatch(showAlert({
                        message: e.message,
                        type: 'danger',
                        title: 'Something went wrong',
                        isShow: true
                    }))
                }
            }, timeout)
        }
    }

    return (
        <div className='search'>
            <div className='search-not-allowed-div'>
                {
                    notAllowed &&
                    <span className='search-not-allowed-text'>Only english letters allowed</span>
                }
            </div>
            <AsyncSelect
                placeholder={'Search...'}
                value={selectedValue}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.key}
                loadOptions={loadOptions}
                onChange={handleChange}
                onBlur={() => setNotAllowed(false)}
                styles={customStyles}
            />
        </div>
    )
}


