import React, { useState, useEffect } from "react";

const BlueBox = (props: BoxProps) => {
	const { count, onClick, styles } = props;

	const baseStyle: CSSProperties = {
		width: "100px",
		height: "100px",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		border: "solid 1px black",
		backgroundColor: "rgba(0,0,255,0.5)",
	};
	const mergedStyle = Object.assign({}, baseStyle, styles);

	return <div style={mergedStyle}>{props.count}</div>;
};

export default BlueBox;
