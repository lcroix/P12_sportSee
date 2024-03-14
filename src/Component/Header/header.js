import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo/logo.png"
import './header.css'

function Header() {
    return (
<div className='navbar'>
<img src={logo} alt="logo SportSee" className="logo"/>
<NavLink to="/" className="navbar-link">Accueil</NavLink>
<NavLink to="/" className="navbar-link">Profil</NavLink>
<NavLink to="/" className="navbar-link">Réglages</NavLink>
<NavLink to="/" className="navbar-link">Communauté</NavLink>
</div>
    )
}
export default Header;