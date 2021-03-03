import React from "react";

//types
import { InputBoxProps } from "../../types/global";

const InputBox: React.FC<InputBoxProps> = ({ value, onChange }) => {
	return (
		<label>
			Enter number of balls:{" "}
			<input value={value} onChange={onChange} name="ball count" />
		</label>
	);
};
export default InputBox;
