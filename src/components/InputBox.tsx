import React from "react";

// css
import "../css/InputBox.css";

//types
import { InputBoxProps } from "../types/global";

const InputBox: React.FC<InputBoxProps> = ({
	value,
	onChange,
	disabled = false,
}) => {
	return (
		<label>
			Enter number of balls:{" "}
			<input
				type="number"
				disabled={disabled}
				value={value}
				onChange={onChange}
				name="ball count"
			/>
		</label>
	);
};
export default InputBox;
