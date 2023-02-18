
import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import test from './test'
import "../assets/stylesheet.scss";
import HeaderIconNav from './components/HeaderIconNav';


function App() {
    return (
        <div>
            <nav className="header__search-bar">
                <div className="header__icon-group">
                    {/* Added instead of using icon-group above as parent element */}
                    <HeaderIconNav />
                </div>
            </nav>
            {/* Closes Nav when hovered outside of navigation */}
            <div className="nav-underlay"></div>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App />)

