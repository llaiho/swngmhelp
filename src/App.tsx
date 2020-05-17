import React, { useState } from 'react';
import './App.css';
import createSector from './generators/createSector';
import RootView from './views/RootView';

import logo from './views/swncover.png';
import MainControls from './components/MainControls';

const Recoil = require('recoil');




function App() {


  return (
    <div className="App">
      
      <Recoil.RecoilRoot>
        <RootView />
        <MainControls />
      </Recoil.RecoilRoot>


      <img src={logo} className="logo" />

    </div>
  );
}




export default App;
