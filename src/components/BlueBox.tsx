import React, { useState, useEffect } from "react";

// types
import CSS from "csstype";
import { BoxProps } from "../types/global";

interface BlueBoxProps extends BoxProps {
	numBalls: number;
}

const BlueBox = (props: BlueBoxProps) => {
	const { count, onClick, styles, numBalls } = props;

	let percentComplete = (count / numBalls) * 100;
	console.log({ count, numBalls, percentComplete });
	const baseStyle: CSS.Properties = {
		width: "100px",
		height: "100px",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		border: "solid 1px black",
		background: `linear-gradient(to top, rgba(0,0,255,0.5) ${percentComplete}%, rgba(0,0,255,0.25) ${percentComplete}%)`,
		marginRight: "25px",
	};
	const mergedStyle = Object.assign({}, baseStyle, styles);

	return (
		<div style={mergedStyle} onClick={onClick}>
			{count}
		</div>
	);
};

export default BlueBox;
