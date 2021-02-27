import React, { useState, useEffect } from "react";

interface RedBoxProps {
	count: number;
}
const RedBox = (props: RedBoxProps) => {
	const { count } = props;
	return (
		<p
			style={{
				width: "100px",
				height: "100px",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				border: "solid 1px black",
				backgroundColor: "rgba(255,0,0,0.5)",
			}}
		>
			{count}
		</p>
	);
};

export default RedBox;
