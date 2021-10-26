
import React from 'react';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import logo from '../../images/logo.png';
import './Header.css'


const Header = () => {
    const { user } = useAuth();
    return (
        <header className="Header">
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav>
                <ul className="navbar">
                    <li className="nav-item"><NavLink className="nav-link" to="/shop">Shop</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/order-review">Order Review</NavLink></li>
                    <li className="nav-item"><NavLink className="nav-link" to="/inventory">Manage Inventory here</NavLink></li>
                    {
                        user.email ? <li className="nav-item"><NavLink className="nav-link" to="/#">{user.displayName}</NavLink></li>
                            : <li className="nav-item"><NavLink className="nav-link" to="/login">Login</NavLink></li>
                    }

                </ul>
            </nav>
        </header>
    );
};

export default Header;