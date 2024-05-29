import getEndpoint from './getEndpoint'

export default async function (uri: string, token: string): Promise<object[]> {
	let seedTracks: string[] = []
	let recommendedTracks: string[] = []
	let albums: object[] = []

	await getEndpoint(`/albums/${uri}`, token).then((r: any) => {
		r.data.tracks.items
			.slice(0, 5)
			.forEach((track: any) => seedTracks.push(track.id))
	})
	await getEndpoint(
		`/recommendations?seed_tracks=${seedTracks.join(',')}`,
		token
	).then((r: any) => {
		r.data.tracks.forEach((track: any) => recommendedTracks.push(track.id))
	})
	await getEndpoint(
		`/tracks?ids=${recommendedTracks.slice(0, 50).join(',')}`,
		token
	).then((r: any) =>
		r.data.tracks.forEach((track: any) => albums.push(track.album))
	)

	return albums
}
