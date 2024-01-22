import axios, { type RawAxiosRequestHeaders, type AxiosInstance } from 'axios'
import { type ArgeoConfig } from '../interfaces'
import { DEFAULT_BASE_URL } from '../constants'
import { generateJWT } from './generate-jwt'

export function generateAxiosInstance({ baseURL, token }: ArgeoConfig): AxiosInstance {
	const regexpJWT = /^[\w-]+\.[\w-]+\.[\w-]+$/

	if (typeof token === 'string' && !regexpJWT.test(token)) {
		throw new Error('The token must be a JWT')
	}

	if (typeof token === 'object' && typeof token.secret !== 'string') {
		throw new Error('The token secret must be a string')
	}

	if (typeof token === 'object' && typeof token.key !== 'string') {
		throw new Error('The token key must be a string')
	}

	const headers: RawAxiosRequestHeaders = {}

	if (typeof token === 'object') headers.Authorization = `Bearer ${generateJWT(token.secret, token.key)}`
	if (typeof token === 'string') headers.Authorization = `Bearer ${token}`

	return axios.create({
		baseURL: typeof baseURL === 'string' ? baseURL : DEFAULT_BASE_URL,
		headers
	})
}
