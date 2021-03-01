import CSS from "csstype";

interface BoxProps {
	count: number;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
	styles: CSS.Properties;
}
