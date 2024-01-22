import { type AxiosInstance } from 'axios'
import { generateAxiosInstance } from './utils'
import { type ArgeoConfig } from './interfaces'

/**
 * Crea un instancia con todos los métodos necesarios para utilizar la API
 */
export class Argeo {
	private readonly instance: AxiosInstance

	constructor({ baseURL, token }: ArgeoConfig = {}) {
		this.instance = generateAxiosInstance({ baseURL, token })
	}
}
