import { AxiosError } from 'axios'
import getEndpoint from './getEndpoint'

interface IUserData {
	userData: {
		id: string
		display_name: string
		token: string
		imageUrl: string
	}
}

export default async function getUserData(token: string): Promise<IUserData> {
	let result = {} as IUserData
	await getEndpoint('/me', token)
		.then(
			(r: any) =>
				(result = {
					userData: {
						id: r.data.id,
						display_name: r.data.display_name,
						token,
						imageUrl: r.data.images[0].url,
					},
				})
		)
		.catch((err: AxiosError) => {
			throw new Error(err.message)
		})
	return result
}
