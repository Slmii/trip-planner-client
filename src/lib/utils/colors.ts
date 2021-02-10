const rgbToHex = (rgb: string) => {
	// Choose correct separator
	const sep = rgb.indexOf(',') > -1 ? ',' : ' ';

	// Turn "rgb(r,g,b)" into [r,g,b]
	const rgbArr = rgb.substr(4).split(')')[0].split(sep);

	let r = (+rgbArr[0]).toString(16),
		g = (+rgbArr[1]).toString(16),
		b = (+rgbArr[2]).toString(16);

	if (r.length == 1) r = '0' + r;
	if (g.length == 1) g = '0' + g;
	if (b.length == 1) b = '0' + b;

	return `#${r}${g}${b}`;
};

const hexToRgb = (hex: string, opacity?: number) => {
	const bigint = parseInt(hex.substring(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;

	if (opacity) {
		return `rgba(${r}, ${g}, ${b}, ${opacity})`;
	}

	return `rgba(${r}, ${g}, ${b})`;
};

export const colors = {
	rgbToHex,
	hexToRgb
};
