import React, { useState, useEffect } from "react";

// types
import CSS from "csstype";
import { BoxProps } from "../types/global";

const BlueBox = (props: BoxProps) => {
	const { count, onClick, styles } = props;

	const baseStyle: CSS.Properties = {
		width: "100px",
		height: "100px",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		border: "solid 1px black",
		backgroundColor: "rgba(0,0,255,0.5)",
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
