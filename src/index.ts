import { createQuery, createRequestOptions } from './utils'
import { DEFAULT_BASE_URL } from './constants'
import {
	type ArgeoConfig,
	type ArgeoResponse,
	type AllParams,

	// Provincias
	type ProvinciasResponse,
	type SeveralProvinciasResponse,
	type ProvinciaParams,

	// Departamentos
	type DepartamentosResponse,
	type SeveralDepartamentosResponse,
	type DepartamentoParams,

	// Municipios
	type SeveralMunicipiosResponse,
	type MunicipiosResponse,
	type MunicipioParams
} from './interfaces'

/**
 * Crea un instancia con todos los métodos necesarios para utilizar la API
 */
export class Argeo {
	private readonly options: RequestInit
	private readonly baseURL: string

	constructor ({ baseURL, token }: ArgeoConfig = {}) {
		this.options = createRequestOptions({ baseURL, token })

		if (typeof baseURL === 'string' && baseURL.length < 1) throw new Error('Invalid baseURL')
		this.baseURL = typeof baseURL === 'string' ? baseURL : DEFAULT_BASE_URL
	}

	getBaseURL (): string {
		return this.baseURL
	}

	getOptions (): RequestInit {
		return this.options
	}

	private async makeRequest (endpoint: string, params: AllParams = {}): Promise<ArgeoResponse<unknown>> {
		try {
			if (Array.isArray(params)) {
				const response: Response = await fetch(this.baseURL + endpoint, {
					...this.options,
					method: 'POST',
					body: JSON.stringify({
						[`${endpoint.substring(5)}`]: params.map((param, index) => {
							if (param.campos === undefined) return param
							if (!Array.isArray(param.campos)) throw new Error(`The field 'campos' in the index ${index} must be an array`)

							return { ...param, campos: param.campos.join(',') }
						})
					})
				})

				const data = await response.json()
				if (response.status >= 300) throw new Error(JSON.stringify(data))

				return { data, error: null }
			}

			if (params.campos !== undefined && !Array.isArray(params.campos)) throw new Error('The field \'campos\' must be an array')

			const query = createQuery(params)
			const response = await fetch(`${this.baseURL}${endpoint}?${query}`, { ...this.options, method: 'GET' })
			const data = await response.json()

			if (response.status >= 300) throw new Error(JSON.stringify(data))

			return { data, error: null }
		} catch (error) {
			return { data: null, error }
		}
	}

	async provincias (params: ProvinciaParams): Promise<ArgeoResponse<ProvinciasResponse>>
	async provincias (params: ProvinciaParams[]): Promise<ArgeoResponse<SeveralProvinciasResponse>>
	async provincias (params: ProvinciaParams | ProvinciaParams[] = {}): Promise<ArgeoResponse> {
		return await this.makeRequest('/api/provincias', params)
	}

	async departamentos (params: DepartamentoParams): Promise<ArgeoResponse<DepartamentosResponse>>
	async departamentos (params: DepartamentoParams[]): Promise<ArgeoResponse<SeveralDepartamentosResponse>>
	async departamentos (params: DepartamentoParams | DepartamentoParams[] = {}): Promise<ArgeoResponse> {
		return await this.makeRequest('/api/departamentos', params)
	}

	async municipios (params: MunicipioParams): Promise<ArgeoResponse<MunicipiosResponse>>
	async municipios (params: MunicipioParams[]): Promise<ArgeoResponse<SeveralMunicipiosResponse>>
	async municipios (params: MunicipioParams | MunicipioParams[] = {}): Promise<ArgeoResponse> {
		return await this.makeRequest('/api/municipios', params)
	}
}
