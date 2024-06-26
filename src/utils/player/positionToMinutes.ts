export default function positionToMinutes(ms: number): string {
	const minutes = Math.floor(ms / 60000)
	const seconds = parseInt(((ms % 60000) / 1000).toFixed(0))
	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}
