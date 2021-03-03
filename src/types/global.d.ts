import CSS from "csstype";

export interface BoxProps {
	count: number;
	onClick?: (event: React.MouseEvent<HTMLElement>) => void;
	styles?: CSS.Properties;
}

export interface InputBoxProps {
	value: number | "";
	onChange: (event: React.FormEvent<HTMLInputElement>) => void;
	styles?: CSS.Properties;
}

export type GameState = "setup" | "ongoing" | "won" | "lost";

