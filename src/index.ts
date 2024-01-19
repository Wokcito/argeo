import { type AxiosInstance } from 'axios'
import { generateAxiosInstance, generateJWT } from './utils'
import { type ArgeoConfig } from './interfaces'

/**
 * Crea un instancia con todos los métodos necesarios para utilizar la API
 */
export class Argeo {
	private readonly instance: AxiosInstance

	constructor({ baseURL, secret, key, token }: ArgeoConfig = {}) {
		this.validateString(baseURL, 'baseURL')
		this.validateString(secret, 'secret')
		this.validateString(token, 'token')
		this.validateString(key, 'key')

		if (
			typeof key === 'string' &&
			typeof secret === 'string' &&
			typeof token !== 'string'
		) {
			token = generateJWT(secret, key)
		}

		this.instance = generateAxiosInstance({ baseURL, token })
	}

	private validateString(param: string | undefined, paramName: string): void {
		if (typeof param !== 'undefined' && typeof param !== 'string') {
			throw new Error(`The ${paramName} must be a string`)
		}
	}
}
