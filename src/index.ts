import { type AxiosError, type AxiosInstance } from 'axios'
import { generateAxiosInstance } from './utils'
import { type ProvinciasResponse, type ArgeoConfig, type SeveralProvinciasResponse, type ProvinciaFindParams, type ArgeoResponse } from './interfaces'

/**
 * Crea un instancia con todos los métodos necesarios para utilizar la API
 */
export class Argeo {
	private readonly instance: AxiosInstance

	constructor({ baseURL, token }: ArgeoConfig = {}) {
		this.instance = generateAxiosInstance({ baseURL, token })
	}

	private async makeRequest(method: 'GET' | 'POST', endpoint: string, params = {}): Promise<ArgeoResponse<unknown>> {
		try {
			if (method === 'POST') {
				const { data } = await this.instance.post(endpoint, params)
				return { data, error: null }
			}

			const { data } = await this.instance.get(endpoint, params)
			return { data, error: null }
		} catch (error) {
			return { data: null, error: (error as AxiosError).response?.data }
		}
	}

	async provincias(params: ProvinciaFindParams): Promise<ArgeoResponse<ProvinciasResponse>>
	async provincias(params: ProvinciaFindParams[]): Promise<ArgeoResponse<SeveralProvinciasResponse>>
	async provincias(params: ProvinciaFindParams | ProvinciaFindParams[] = {}): Promise<ArgeoResponse> {
		const endpoint = '/api/provincias'

		if (Array.isArray(params)) {
			return await this.makeRequest('POST', endpoint, { provincias: params })
		}

		return await this.makeRequest('GET', endpoint, { ...params, campos: params.campos?.join(',') })
	}
}
