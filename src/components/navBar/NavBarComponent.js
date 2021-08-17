import React, {useState} from 'react'
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {changeTemperatureType, changeTheme} from "../../store/actions";
import Switch from "react-switch";

export const NavBarComponent = () => {
    const appState = useSelector(state => state.appState)
    const dispatch = useDispatch()
    const [checked, setChecked] = useState(true)

    const onChangeTempTypeHandler = () => {
        setChecked(prevState => !prevState)
        dispatch(changeTemperatureType(checked ? 'imperial' : 'metric'))
    }

    const onChangeThemeHandler = () => {
        const newTheme = appState.theme === 'dark' ? 'light' : 'dark'
        dispatch(changeTheme(newTheme))
    }

    return (
        <Navbar style={{borderBottom: '1px solid blueviolet'}} bg={appState.theme} variant={appState.theme} expand="lg">
            <Container>
                <Navbar.Brand href="/" className='me-5'>
                    <img
                        alt="logo"
                        src="/favicon.png"
                        width="35"
                        height="35"
                        className="d-inline-block align-top"
                    />
                    <span style={{fontSize: '1.2rem', marginLeft: '1rem'}}>
                        <small style={{fontSize: '0.6rem'}}>for &nbsp;</small>
                        <b style={{color: 'blueviolet'}}>Herolo</b> Weather</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav className="me-auto">
                        <NavLink className="nav-link font-weight-bold ps-2 pe-2 fw-bold" to="/" exact>Home</NavLink>
                        <NavLink className="nav-link font-weight-bold ps-2 pe-2 fw-bold" to="/favorite">Favorite</NavLink>
                    </Nav>
                    <Navbar.Text className='d-flex justify-content-center align-items-center'>
                        <label className='mt-1 me-5 d-flex justify-content-center align-items-center'>&#8457; &nbsp;
                            <Switch
                                onChange={onChangeTempTypeHandler}
                                checked={checked}
                                onColor="#c7a0ea"
                                onHandleColor="#8a2be2"
                                handleDiameter={20}
                                uncheckedIcon={false}
                                checkedIcon={false}
                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                height={15}
                                width={40}
                            />
                            &nbsp; &#8451;
                        </label>
                        <Button
                            style={{marginTop: '7px'}}
                            onClick={onChangeThemeHandler}
                            size='sm'
                            variant={appState.theme === 'light' ? 'outline-dark' : 'outline-light'}
                        >
                            {
                                appState.theme === 'light' ? "🌜 Dark theme" : "🌞 Light theme"
                            }
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
