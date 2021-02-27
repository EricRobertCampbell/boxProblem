<<<<<<< HEAD
import React, { Component } from 'react';
import './App.css';
import StartBtn from './components/StartBtn';
import AddBoxBtn from './components/AddBoxBtn';


function App() {
  return (
    <div>
      <StartBtn />
      <AddBoxBtn />
    </div>
  );
=======

import React from "react";
import logo from "./logo.svg";
import "./App.css";

import BallCounter from "./components/BallCounter";
import BlueBox from "./components/BlueBox";
import RedBoxList from "./components/RedBoxList";
import RedBox from "./components/RedBox";
import InputBox from './components/InputBox/InputBox'

function App() {
	return (
		<>
			<BallCounter count={5} />
			<BlueBox count={7} />
			<RedBox count={9} />
			<RedBoxList ballsList={[1, 2, 3, 4]} />
      <InputBox />
		</>
	);

>>>>>>> bcc1057d8f9292a1ba4de14967afb0a4fb70e64a
}

export default App;
