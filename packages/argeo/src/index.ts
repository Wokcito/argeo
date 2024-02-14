import { createQuery, createRequestOptions } from './utils'
import { DEFAULT_BASE_URL } from './constants'
import {
	type ArgeoConfig,
	type ArgeoResponse,
	type AllParams,
	type ArgeoPlugin,

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
	private readonly plugins: ArgeoPlugin[] | undefined

	constructor ({
		baseURL,
		token,
		plugins
	}: ArgeoConfig = {}) {
		this.options = createRequestOptions({ baseURL, token })

		if (typeof baseURL === 'string' && baseURL.length < 1) throw new Error('Invalid baseURL')
		this.baseURL = typeof baseURL === 'string' ? baseURL : DEFAULT_BASE_URL

		this.plugins = plugins
	}

	getBaseURL (): string {
		return this.baseURL
	}

	getOptions (): RequestInit {
		return this.options
	}

	private async makeRequest <T = unknown>(endpoint: string, params: AllParams = {}): Promise<ArgeoResponse<T>> {
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

	private async interceptResponse <T = unknown>(response: ArgeoResponse<T>): Promise<ArgeoResponse<any>> {
		if (this.plugins === undefined) return response

		let interceptedResponse = response
		const pluginPromises = this.plugins.map(async plugin => { interceptedResponse = await plugin.interceptResponse(interceptedResponse) })
		await Promise.allSettled(pluginPromises)
		return interceptedResponse
	}

	async provincias (params: ProvinciaParams): Promise<ArgeoResponse<ProvinciasResponse>>
	async provincias (params: ProvinciaParams[]): Promise<ArgeoResponse<SeveralProvinciasResponse>>
	async provincias <T>(params: ProvinciaParams): Promise<ArgeoResponse<T>>
	async provincias <T>(params: ProvinciaParams[]): Promise<ArgeoResponse<T>>
	async provincias (params: ProvinciaParams | ProvinciaParams[] = {}): Promise<ArgeoResponse> {
		const response = await this.makeRequest<ProvinciasResponse | SeveralProvinciasResponse>('/api/provincias', params)
		return await this.interceptResponse<ProvinciasResponse | SeveralProvinciasResponse>(response)
	}

	async departamentos (params: DepartamentoParams): Promise<ArgeoResponse<DepartamentosResponse>>
	async departamentos (params: DepartamentoParams[]): Promise<ArgeoResponse<SeveralDepartamentosResponse>>
	async departamentos <T>(params: DepartamentoParams): Promise<ArgeoResponse<T>>
	async departamentos <T>(params: DepartamentoParams[]): Promise<ArgeoResponse<T>>
	async departamentos (params: DepartamentoParams | DepartamentoParams[] = {}): Promise<ArgeoResponse> {
		return await this.makeRequest('/api/departamentos', params)
	}

	async municipios (params: MunicipioParams): Promise<ArgeoResponse<MunicipiosResponse>>
	async municipios (params: MunicipioParams[]): Promise<ArgeoResponse<SeveralMunicipiosResponse>>
	async municipios <T>(params: MunicipioParams): Promise<ArgeoResponse<T>>
	async municipios <T>(params: MunicipioParams[]): Promise<ArgeoResponse<T>>
	async municipios (params: MunicipioParams | MunicipioParams[] = {}): Promise<ArgeoResponse> {
		return await this.makeRequest('/api/municipios', params)
	}
}
