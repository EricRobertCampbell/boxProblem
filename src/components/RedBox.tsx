import React, { useState, useEffect } from "react";

// types
import CSS from "csstype";
import { BoxProps } from "../types/global";

interface RedBoxProps extends BoxProps {
	position: number;
	addBall: (e: React.MouseEvent<HTMLElement>) => void;
	removeBall: (e: React.MouseEvent<HTMLElement>) => void;
	explode: () => void;
}

const RedBox: React.FC<RedBoxProps> = ({
	count,
	onClick,
	addBall,
	explode,
	removeBall,
}) => {
	return (
		<div
			style={{
				width: "100px",
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "solid 1px black",
				backgroundColor: "rgba(255,0,0,0.5)",
			}}
			onClick={explode}
		>
			<button onClick={removeBall}>-</button>
			{count}
			<button onClick={addBall}>+</button>{" "}
		</div>
	);
};

export default RedBox;
