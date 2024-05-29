import getEndpoint from './getEndpoint'

export default async function (id: string, token: string): Promise<object> {
	let result = {}
	await getEndpoint(`/albums/${id}`, token).then((r: any) => (result = r.data))
	return result
}
