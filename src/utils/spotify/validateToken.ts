import getEndpoint from './getEndpoint'

export default async function validateToken(token: string): Promise<boolean> {
	let result = false
	await getEndpoint('/me', token)
		.then(() => (result = true))
		.catch(() => (result = false))

	return result
}
