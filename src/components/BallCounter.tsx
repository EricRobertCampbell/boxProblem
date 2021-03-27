import React, { useState, useEffect } from "react";

import { GameState } from "../types/global";

interface BallCounterProps {
	count: number;
	gameState: GameState;
}
const BallCounter = ({ count, gameState }) => {
	return (
		<p style={{ visibility: gameState === "setup" ? "visible" : "hidden" }}>
			Balls Remaining: {count}
		</p>
	);
};

export default BallCounter;
