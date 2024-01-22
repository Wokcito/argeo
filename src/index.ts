import { type AxiosInstance } from 'axios'
import { generateAxiosInstance } from './utils'
import { type ArgeoConfig } from './interfaces'
import { Provincias } from './modules'

/**
 * Crea un instancia con todos los métodos necesarios para utilizar la API
 */
export class Argeo {
	private readonly instance: AxiosInstance

	provincias: Provincias

	constructor({ baseURL, token }: ArgeoConfig = {}) {
		this.instance = generateAxiosInstance({ baseURL, token })

		this.provincias = new Provincias(this.instance)
	}
}
