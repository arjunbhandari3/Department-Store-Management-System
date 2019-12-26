import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import SideBar from './components/SideBar';

import './App.css';
import './sass/Layouts.scss';

import Routes from './Routes';

import { StateProvider } from './contexts/employeeRegister';

function App() {
  return (
    <StateProvider>
      <Router>
        <div className="App">
          <SideBar />
          <main className="main">
            <div className="header">Department Store Management System</div>
            <div style={{ padding: 20 }}>
              <Routes />
            </div>
          </main>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
