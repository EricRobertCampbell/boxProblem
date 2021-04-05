import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

import BallCounter from "./components/BallCounter";
import BlueBox from "./components/BlueBox";
import RedBoxList from "./components/RedBoxList";
import RedBox from "./components/RedBox";
import InputBox from "./components/InputBox";
import { StartButton } from "./components/StartBtn";
import AddBoxBtn from "./components/AddBoxBtn";

// types
import { GameState } from "./types/global";

const App: any = () => {
	const [numBalls, setNumBalls] = useState<number>(0);
	const [ballsList, setBallsList] = useState<number[]>([0, 0, 0, 0, 0]);
	const [blueBoxCount, setBlueBoxCount] = useState<number>(0);
	const [remaining, setRemaining] = useState<number>(0);
	const [gameState, setGameState] = useState<GameState>("setup");
	const [readyToStart, setReadyToStart] = useState<boolean>(false);
	const [boardOkToStart, setBoardOkToStart] = useState(false);

	// update number of unallocated balls
	useEffect(() => {
		setRemaining(
			numBalls -
				ballsList.reduce((acc, num) => acc + num, 0) -
				blueBoxCount
		);
	}, [ballsList, blueBoxCount, numBalls]);

	// determine when the game is ready to begin
	useEffect(() => {
		if (
			numBalls > 0 &&
			ballsList.length > 0 &&
			remaining === 0 &&
			boardOkToStart
		) {
			setReadyToStart(true);
		} else {
			setReadyToStart(false);
		}
	}, [numBalls, ballsList, remaining]);

	// check for having won
	useEffect(() => {
		if (
			gameState === "ongoing" &&
			numBalls > 0 &&
			blueBoxCount === numBalls
		) {
			setGameState("won");
		}
	}, [blueBoxCount, numBalls, gameState]);

	// check for having lost
	useEffect(() => {
		if (gameState === "ongoing") {
			// check: if ANY are too big or if all are too small
			let numReadyToExplode = 0;
			let numNonZero = 0;
			for (let i = 0; i < ballsList.length; i++) {
				const count = ballsList[i];
				const position = i + 1;
				if (count === position) {
					numReadyToExplode++;
				}
				if (count > position) {
					console.log(`Box ${position} impossible to explode;  lost`);
					setGameState("lost");
					return;
				}
				if (count !== 0) {
					numNonZero++;
				}
			}
			if (numNonZero > 0 && numReadyToExplode === 0) {
				setGameState("lost");
			}
		}
	}, [gameState, ballsList]);

	// check if the game, as being set up, is OK to start
	useEffect(() => {
		if (gameState !== "setup") {
			return;
		}
		// check: if ANY are too big or if all are too small
		let numReadyToExplode = 0;
		let numNonZero = 0;
		for (let i = 0; i < ballsList.length; i++) {
			const count = ballsList[i];
			const position = i + 1;
			if (count === position) {
				numReadyToExplode++;
			}
			if (count > position) {
				setBoardOkToStart(false);
				return;
			}
			if (count !== 0) {
				numReadyToExplode++;
			}
		}
		if (numReadyToExplode === 0) {
			setBoardOkToStart(false);
			return;
		}
		setBoardOkToStart(true);
	}, [ballsList, gameState]);

	const explode: (i: number) => void = (i: number) => {
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
		setBallsList((oldValue) => [...oldValue, 0]);
	};
	const removeBox: () => void = () => {
		console.log(`removeBox`);
		if (ballsList.length > 0) {
			setBallsList((oldValue) => oldValue.slice(0, oldValue.length - 1));
		}
	};

	const resetGame: () => void = () => {
		console.log("Resetting game:");
		setNumBalls(0);
		setGameState("setup");
		setBlueBoxCount(0);
		setBallsList([0, 0, 0, 0, 0]);
	};

	return (
		<div
			style={{
				maxWidth: "800px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				backgroundColor: "hsl(36, 100%, 80%)",
				padding: "10px",
				borderRadius: "10px",
				boxShadow: "5px 5px 2px grey",
			}}
		>
			<h1>Box Game</h1>
			<div className="rules">
				<h2>Rules</h2>
				<p>
					Your goal is to fill the blue box with all of the balls!
					Initially, you can only put balls into the red boxes on the
					right. Once there are the same number of balls in a red box
					as its number (e.g. two balls in the second box, three in
					the third...), you can <emph>explode</emph> it! When that
					happens, one ball from that box is moved into each of the
					boxes with a lower number, and one is placed into the blue
					box.
				</p>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<div
					id="setupDiv"
					style={{
						width: "50%",
						display: "flex",
						flexDirection: "column",
					}}
				>
					<InputBox
						value={numBalls || ""}
						onChange={(
							e: React.FormEvent<HTMLInputElement>
						): void => {
							setNumBalls(Number(e.currentTarget.value));
						}}
						disabled={gameState !== "setup"}
					/>
					<span>
						<button
							disabled={gameState !== "setup"}
							onClick={() => removeBox()}
						>
							Remove Box
						</button>
						<button
							disabled={gameState !== "setup"}
							onClick={() => addBox()}
						>
							Add Box
						</button>
					</span>
				</div>
				<StartButton
					disabled={!readyToStart || gameState !== "setup"}
					onClick={() => setGameState("ongoing")}
				/>
			</div>
			{<BallCounter count={remaining} gameState={gameState} />}
			<div style={{ display: "flex" }}>
				<BlueBox count={blueBoxCount} numBalls={numBalls} />
				<RedBoxList
					ballsList={ballsList}
					explode={explode}
					addBall={addBallGenerator}
					removeBall={removeBallGenerator}
					remaining={remaining}
					gameState={gameState}
					numBalls={numBalls}
				/>
			</div>
			{gameState === "won" ? <p>Victory!</p> : null}
			{gameState === "lost" ? <p>You lost!</p> : null}

			{gameState === "won" || gameState === "lost" ? (
				<button style={{ flexBasis: "auto" }} onClick={resetGame}>
					Reset
				</button>
			) : null}
		</div>
	);
};

export default App;
