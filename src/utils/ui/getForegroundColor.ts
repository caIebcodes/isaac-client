export default function (rgb: [number, number, number]) {
	return rgb.reduce((a, b) => a + b) > 380 ? 'black' : 'white'
}
