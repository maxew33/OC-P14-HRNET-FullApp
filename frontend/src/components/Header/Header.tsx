import React from 'react'

import Logo from '../../assets/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logoWrapper">
                <img src={Logo} alt="Wealth Health logo" className="logo" />
                <h2 className="logoName">Wealth Health</h2>
            </div>
            <h1 className="appName">HRNet</h1>
            <button className="exit" aria-label="logout">
                <FontAwesomeIcon icon={faPowerOff} />
            </button>
        </header>
    )
}

export default Header
