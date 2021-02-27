import React, { useState, useEffect } from "react";
import RedBox from "./RedBox";

interface RedBoxListProps {
	ballsList: Array<number>;
}

const RedBoxList = (props: RedBoxListProps) => {
	return (
		<div style={{ display: "flex" }}>
			{props.ballsList.map((count: number) => (
				<RedBox count={count} />
			))}
		</div>
	);
};

export default RedBoxList;
