import React from 'react';
import './App.css';
import {UtilExample} from './components/UtilExample'
import {WalletExample} from './components/WalletExample'
import logo from './logo.png'

function App() {
    return (
        <div>
            <div className='Header'>
                <img src={logo} alt='logo'/>
            </div>
            <div>
                <div className='Card'><h1>Example React App</h1></div>
                <UtilExample/>
                <WalletExample/>
            </div>

        </div>
    );
}

export default App;
