import React, {Component} from 'react';
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home";
import Forms from "./Pages/Forms";
import ResponsiveAppBar from "./components/AppBar";

class App extends Component {
  render() {
    return (

          <div className="App">
          <ResponsiveAppBar/>
              <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="Forms" element={<Forms/>} />
              </Routes>
          </div>

    );
  }
}

export default App;