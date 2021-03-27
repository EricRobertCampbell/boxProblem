import React, { useState, useEffect } from "react";

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

	return (
		<div>
			<div
				style={{
					width: "100px",
					height: "100px",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
					border: "solid 1px black",
					background: readyToExplode
						? "linear-gradient(red, blue)"
						: impossibleToContinue
						? "linear-gradient(red, black)"
						: "linear-gradient(red, red)",
				}}
				onClick={gameState === "ongoing" ? explode : () => {}}
			>
				<button
					style={{ visibility: ableToRemove ? "visible" : "hidden" }}
					onClick={removeBall}
				>
					-
				</button>
				{count}
				<button
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
