import React, { Component, useEffect } from 'react';
import Main from '../main'

const menus = [
    {
        title: 'menu-support',
        link: '/support',
        menus: [{ title: 'check order status', link: '/check-order-status' }, { title: 'shipping & returns', link: '/shipping-returns' }, { title: 'faq', link: '/faq' }]
    },
    {
        title: 'menu-calculators',
        link: '/calculators',
        menus: [{ title: 'calculator', link: '/calculators' }, { title: 'how-tos & guides', link: '/how-tos-guides' }]
    },
    {
        title: 'menu-account',
        link: '/account',
        menus: [{ title: 'login to account', link: '/login' }, { title: 'perks & rewards', link: '/perks' }, { title: 'favorites', link: '/favorites' }]
    }
]



export default function HeaderIconNav() {
    useEffect(() => {
        new Main()
    }, [])

    return (
        <React.Fragment>
            <div className="header__icon-layout">
                <div className="header__support-icon --desktop">
                    <img data-menu="menu-support" src="../../support-nav.svg" alt="support icon" />
                </div>
                <a href="/pages/makesy-calculators-guides">
                    <img data-menu="menu-calculators" className="--desktop" src="../../calculator-icon-nav.svg" alt="calculator icon" />
                </a>
                <a className="--desktop" href="/account">
                    <img data-menu="menu-account" src="../../profile-icon-nav.svg" alt="account icon" />
                </a>
                <img className="--mobile" id="search-mobile" src="/" alt="question icon" style={{ display: "none" }} />
                <a href="/cart" data-action="open-drawer" data-drawer-id="sidebar-cart" aria-label="Open cart">
                    <svg width="24" height="24" viewBox="0 0 17 17" fill="none">
                        <path d="M2.73655 6.17974C2.85267 5.36687 3.54884 4.76309 4.36996 4.76309H12.7688C13.5899 
                                        4.76309 14.2861 5.36687 14.4022 6.17974L15.5262 14.0478C15.6682 15.0418 14.8969 15.9311 
                                        13.8928 15.9311H3.24596C2.24185 15.9311 1.47054 15.0418 1.61254 14.0478L2.73655 6.17974Z"
                            stroke="#000"
                            strokeWidth="1"
                        />
                        <path d="M11.9602 4.41332C11.9602 2.5406 10.4421 1.02246 8.56933 1.02246C6.69661 1.02246 5.17847 2.5406 5.17847 4.41332" stroke="#222222" strokeWidth="0.7" />
                    </svg>
                    <span className="small small-many">55</span>
                </a>
            </div>

            {/* data-menu has to also match icon data-menu as well */}
            <div className="header__icon-menus">
                {menus.map(menu => {
                    return (
                        <ul key={menu.title} className="icon__menu" data-menu={menu.title}>
                            {menu.menus.map(item => (
                                <a className="icon__menu-item" key={item.title} href={item.link}><li className="icon__menu-item">{item.title}</li></a>
                            ))}
                        </ul>
                    )
                })}
            </div>
        </React.Fragment>
        
    )
}