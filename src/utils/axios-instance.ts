import axios, { type AxiosInstance } from 'axios'
import { type ArgeoConfig } from '../interfaces'

export function generateAxiosInstance({ baseURL, token }: ArgeoConfig): AxiosInstance {
	const regexpJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/

	if (typeof token === 'string' && !regexpJWT.test(token)) {
		throw new Error('The token must be a JWT')
	}

	return axios.create({
		baseURL: typeof baseURL === 'string' ? baseURL : 'https://apis.datos.gob.ar/georef/api',
		headers: typeof token === 'string' ? { Authorization: `Bearer ${token}` } : {}
	})
}
