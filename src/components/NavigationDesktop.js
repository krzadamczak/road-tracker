import React from "react";
import { NavLink } from "react-router-dom";

function NavigationDesktop(props) {
    return (
        <nav className='nav'>
            <NavLink
                exact
                to='/'
                className='nav__link'
                activeClassName='nav__link--active'>
                Aktualna pogoda
            </NavLink>
            <NavLink
                exact
                to='/zglos-zdarzenie'
                className='nav__link'
                activeClassName='nav__link--active'>
                Nowe zgłoszenie
            </NavLink>
            <NavLink
                exact
                to='/wszystkie-uszkodzenia'
                className='nav__link'
                activeClassName='nav__link--active'>
                Wszystkie znane dotychczas uszkodzenia
            </NavLink>
            <NavLink
                exact
                to='/profil'
                className='nav__link'
                activeClassName='nav__link--active'>
                Profil
            </NavLink>
            <button className='nav__link button--nav' onClick={props.handleLogout}>
                Wyloguj się
            </button>
        </nav>
    );
}

export default NavigationDesktop;
