import React, { useState, useEffect } from "react";

interface BlueBoxProps {
	count: number;
}
const BlueBox = (props: BlueBoxProps) => {
	const { count } = props;
	return (
		<div
			style={{
				width: "100px",
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "solid 1px black",
				backgroundColor: "rgba(0,0,255,0.5)",
			}}
		>
			{props.count}
		</div>
	);
};

export default BlueBox;
