import React, { useState, useEffect } from "react";
import RedBox from "./RedBox";

interface RedBoxListProps {
	ballsList: Array<number>;
	explode: (i: number) => void;
	onClick?: (i: number) => (e: React.MouseEvent<HTMLElement>) => void;
	addBall: (i: number) => (e: React.MouseEvent<HTMLElement>) => void;
	removeBall: (i: number) => (e: React.MouseEvent<HTMLElement>) => void;
	remaining: number;
}

const RedBoxList: React.FC<RedBoxListProps> = ({
	ballsList,
	explode,
	onClick,
	addBall,
	removeBall,
	remaining,
}) => {
	return (
		<div style={{ display: "flex" }}>
			{ballsList.map((count: number, index: number) => (
				<RedBox
					count={count}
					key={index}
					position={index + 1}
					onClick={onClick && onClick(index + 1)}
					addBall={remaining > 0 ? addBall(index + 1) : () => {}}
					removeBall={removeBall(index + 1)}
					explode={
						count === index + 1
							? () => explode(index + 1)
							: () => {}
					}
				/>
			))}
		</div>
	);
};

export default RedBoxList;
