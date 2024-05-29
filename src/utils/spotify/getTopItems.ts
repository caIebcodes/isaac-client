import getEndpoint from './getEndpoint'

export default async function getTopItems(
	token: string,
	type: 'tracks' | 'artists',
	limit = 10
): Promise<object[]> {
	let result = [{}]
	await getEndpoint(`/me/top/${type}?limit=${limit}`, token)
		.then((r: any) => (result = r.data.items))
		.catch((err) => {
			throw new Error(err)
		})
	return result
}
