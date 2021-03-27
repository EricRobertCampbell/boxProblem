import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import BallCounter from "./components/BallCounter";
import BlueBox from "./components/BlueBox";
import RedBoxList from "./components/RedBoxList";
import RedBox from "./components/RedBox";
import InputBox from "./components/InputBox/InputBox";
import StartBtn from "./components/StartBtn";
import AddBoxBtn from "./components/AddBoxBtn";

// types
import { GameState } from "./types/global";

const App: any = () => {
	const [numBalls, setNumBalls] = useState<number>(0);
	const [ballsList, setBallsList] = useState<number[]>([0, 0, 0, 0, 0]);
	const [blueBoxCount, setBlueBoxCount] = useState<number>(0);
	const [remaining, setRemaining] = useState<number>(0);

	useEffect(() => {
		setRemaining(
			numBalls -
				ballsList.reduce((acc, num) => acc + num, 0) -
				blueBoxCount
		);
	}, [ballsList, blueBoxCount, numBalls]);

	const explode: (i: number) => void = (i: number) => {
		console.log(`explodeing with ${i}`);
		setBlueBoxCount((oldValue) => oldValue + 1);
		setBallsList((oldValue) =>
			oldValue.map((value, idx) => {
				if (idx < i - 1) {
					return value + 1;
				} else if (idx === i - 1) {
					return 0;
				} else {
					return value;
				}
			})
		);
	};
	const addBallGenerator: any = (i: number) => (
		e: React.MouseEvent<HTMLElement>
	) => {
		setBallsList((oldValue) => {
			const newValue = [...oldValue];
			newValue[i - 1]++;
			return newValue;
		});
	};

	const removeBallGenerator: any = (i: number) => (
		e: React.MouseEvent<HTMLElement>
	) => {
		setBallsList((oldValue) => {
			const newValue = [...oldValue];
			newValue[i - 1] =
				newValue[i - 1] > 0 ? newValue[i - 1] - 1 : newValue[i - 1];
			return newValue;
		});
	};

	const addBox: () => void = () => {
		console.log(`addBox`);
		setBallsList((oldValue) => [...oldValue, 0]);
	};
	const removeBox: () => void = () => {
		console.log(`removeBox`);
		if (ballsList.length > 0) {
			setBallsList((oldValue) => oldValue.slice(0, oldValue.length - 1));
		}
	};
	return (
		<>
			<StartBtn />
			<button onClick={() => removeBox()}>Remove Box</button>
			<button onClick={() => addBox()}>Add Box</button>
			<BallCounter count={remaining} />
			<BlueBox count={blueBoxCount} />
			<RedBoxList
				ballsList={ballsList}
				explode={explode}
				addBall={addBallGenerator}
				removeBall={removeBallGenerator}
				remaining={remaining}
			/>
			<InputBox
				value={numBalls || ""}
				onChange={(e: React.FormEvent<HTMLInputElement>): void => {
					setNumBalls(Number(e.currentTarget.value));
				}}
			/>
			{numBalls > 0 && blueBoxCount === numBalls ? <p>Victory!</p> : null}
		</>
	);
};

export default App;
