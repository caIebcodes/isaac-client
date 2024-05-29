export default function arrayToRgba(
	list: [number, number, number],
	opacity?: number
) {
	return `rgba(${list.join(', ')}, ${opacity || 1})`
}
