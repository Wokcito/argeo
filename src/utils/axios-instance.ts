import axios, { type AxiosInstance } from 'axios'
import { type ArgeoConfig } from '../interfaces'
import { DEFAULT_BASE_URL } from '../constants'

export function generateAxiosInstance({ baseURL, token }: ArgeoConfig): AxiosInstance {
	const regexpJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/

	if (typeof token === 'string' && !regexpJWT.test(token)) {
		throw new Error('The token must be a JWT')
	}

	return axios.create({
		baseURL: typeof baseURL === 'string' ? baseURL : DEFAULT_BASE_URL,
		headers: typeof token === 'string' ? { Authorization: `Bearer ${token}` } : {}
	})
}
