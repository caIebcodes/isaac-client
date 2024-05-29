import putEndpoint from './putEndpoint'

export default function (
	contextUri: string,
	token: string,
	device_id: string,
	offset?: number
) {
	putEndpoint(`/me/player/play?device_id=${device_id}`, token, {
		context_uri: contextUri,
		offset: { position: offset || 0 },
	})
}
