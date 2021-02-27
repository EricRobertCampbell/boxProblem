import React from "react";
import logo from "./logo.svg";
import "./App.css";

import BallCounter from "./components/BallCounter";
import BlueBox from "./components/BlueBox";
import RedBoxList from "./components/RedBoxList";
import RedBox from "./components/RedBox";

function App() {
	return (
		<>
			<BallCounter count={5} />
			<BlueBox count={7} />
			<RedBox count={9} />
			<RedBoxList ballsList={[1, 2, 3, 4]} />
		</>
	);
}

export default App;
