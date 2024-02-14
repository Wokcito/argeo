import { type ArgeoConfig } from '../interfaces'
import { generateJWT } from './generate-jwt.util'

export function createRequestOptions ({ token }: ArgeoConfig): RequestInit {
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

	const headers = new Headers()

	if (typeof token === 'object') headers.append('Authorization', `Bearer ${generateJWT(token.secret, token.key)}`)
	if (typeof token === 'string') headers.append('Authorization', `Bearer ${token}`)

	return {
		headers
	}
}
