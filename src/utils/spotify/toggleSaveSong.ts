import deleteEndpoint from './deleteEndpoint'
import getEndpoint from './getEndpoint'
import putEndpoint from './putEndpoint'

export default async function (uri: string, token: string) {
	let isLiked = false
	const id = uri.replace('spotify:track:', '')
	await getEndpoint(`/me/tracks/contains?ids=${id}`, token).then(
		(r: any) => (isLiked = r.data[0])
	)
	if (!isLiked) putEndpoint(`/me/tracks?ids=${id}`, token)
	else deleteEndpoint(`/me/tracks?ids=${id}`, token)
}
