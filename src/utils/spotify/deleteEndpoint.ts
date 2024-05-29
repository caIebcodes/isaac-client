import axios, { AxiosError } from 'axios'

export default async function deleteEndpoint(
	endpoint: string,
	token: string,
	data?: object
): Promise<object> {
	let result = {}
	await axios
		.delete(`https://api.spotify.com/v1${endpoint}`, {
			headers: { Authorization: 'Bearer ' + token },
			data: { ...data },
		})
		.then((res) => (result = res))
		.catch((err: AxiosError) => {
			throw new Error(err.message)
		})

	return result
}
