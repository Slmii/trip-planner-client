interface InputSwitchDefault {
	name: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputSwitchWithLabel extends InputSwitchDefault {
	label: string;
	labelPlacement: 'end' | 'start';
}

interface InputSwitchWithoutLabel extends InputSwitchDefault {
	label?: never;
	labelPlacement?: never;
}

export type InputSwitchProps = InputSwitchWithoutLabel | InputSwitchWithLabel;
