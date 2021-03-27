import React, { useState, useEffect } from "react";

//css
import "../css/RedBox.css";

// types
import CSS from "csstype";
import { BoxProps, GameState } from "../types/global";

interface RedBoxProps extends BoxProps {
	position: number;
	addBall: (e: React.MouseEvent<HTMLElement>) => void;
	removeBall: (e: React.MouseEvent<HTMLElement>) => void;
	explode: () => void;
	gameState: GameState;
	remaining: number;
	numBalls: number;
}

const RedBox: React.FC<RedBoxProps> = ({
	count,
	onClick,
	addBall,
	explode,
	removeBall,
	gameState,
	remaining,
	position,
	numBalls,
}) => {
	const [readyToExplode, setReadyToExplode] = useState<boolean>(false);
	const [ableToAdd, setAbleToAdd] = useState<boolean>(false);
	const [ableToRemove, setAbleToRemove] = useState<boolean>(false);
	const [impossibleToContinue, setImpossibleToContinue] = useState<boolean>(
		false
	);

	// determine if it is ready to explode
	useEffect(() => {
		if (count === position) {
			setReadyToExplode(true);
		} else {
			setReadyToExplode(false);
		}
	});

	// determine if we can remove a ball from the box
	useEffect(() => {
		if (gameState === "setup" && count > 0) {
			setAbleToRemove(true);
		} else {
			setAbleToRemove(false);
		}
	}, [gameState, count]);

	// determine if we can add a ball to the box
	useEffect(() => {
		setAbleToAdd(gameState === "setup" && remaining > 0);
	}, [gameState, remaining]);

	// determine if it is impossible to continue
	useEffect(() => {
		if (count > position) {
			setImpossibleToContinue(true);
		} else {
			setImpossibleToContinue(false);
		}
	}, [count, position]);

	const percentComplete = (count / position) * 100;

	return (
		<div>
			<div
				className={"redBox" + (readyToExplode ? " readyToExplode" : "")}
				style={{
					width: "100px",
					height: "100px",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					background: impossibleToContinue
						? "black"
						: `linear-gradient(to top, hsla(0, 100%, 50%, 0.5) ${percentComplete}%, hsla(0, 100%, 50%, 0.25) ${percentComplete}%)`,
				}}
				onClick={gameState === "ongoing" ? explode : () => {}}
			>
				<button
					className="boxButton"
					style={{ visibility: ableToRemove ? "visible" : "hidden" }}
					onClick={removeBall}
				>
					-
				</button>
				{count}
				<button
					className="boxButton"
					style={{ visibility: ableToAdd ? "visible" : "hidden" }}
					onClick={addBall}
				>
					+
				</button>
			</div>
			<p style={{ textAlign: "center" }}>#{position}</p>
		</div>
	);
};

export default RedBox;
