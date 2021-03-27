import "../css/style.css";

type StartButtonProps = {
	disabled?: boolean;
	onClick?: () => void;
};

export const StartButton = ({ disabled = false, onClick = () => {} }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className="start-game-btn"
		>
			Start Game!
		</button>
	);
};
