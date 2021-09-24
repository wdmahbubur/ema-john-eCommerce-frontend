
import React from 'react';
import logo from '../../images/logo.png';
import './Header.css'


const Header = () => {

    return (
        <header className="Header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul className="navbar">
                    <li className="nav-item"><a className="nav-link" href="/#">Shop</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#">Order Review</a></li>
                    <li className="nav-item"><a className="nav-link" href="/#">Manage Inventory here</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;