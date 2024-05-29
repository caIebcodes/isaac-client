import axios, { AxiosError } from 'axios'

export default async function putEndpoint(
	endpoint: string,
	token: string,
	data?: object
): Promise<object> {
	let result = {}
	await axios
		.put(
			`https://api.spotify.com/v1${endpoint}`,
			{ ...data },
			{ headers: { Authorization: 'Bearer ' + token } }
		)
		.then((res) => (result = res))
		.catch((err: AxiosError) => {
			throw new Error(err.message)
		})

	return result
}
