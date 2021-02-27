import React, { useState, useEffect } from "react";

interface BallCounterProps {
	count: number;
}
const BallCounter = (props: BallCounterProps) => {
	return <p>Balls Remaining: {props.count}</p>;
};

export default BallCounter;
