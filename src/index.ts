import { type AxiosError, type AxiosInstance } from 'axios'
import { generateAxiosInstance } from './utils'
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
	private readonly instance: AxiosInstance

	constructor ({ baseURL, token }: ArgeoConfig = {}) {
		this.instance = generateAxiosInstance({ baseURL, token })
	}

	private async makeRequest (endpoint: string, params: AllParams = {}): Promise<ArgeoResponse<unknown>> {
		try {
			if (Array.isArray(params)) {
				const { data } = await this.instance.post(endpoint, {
					provincias: params.map((param, index) => {
						if (param.campos === undefined) return param
						if (!Array.isArray(param.campos)) throw new Error(`The field 'campos' in the index ${index} must be an array`)

						return { ...param, campos: param.campos.join(',') }
					})
				})

				return { data, error: null }
			}

			if (params.campos !== undefined && !Array.isArray(params.campos)) throw new Error('The field \'campos\' must be an array')

			const { data } = await this.instance.get(endpoint, {
				params: {
					...params,
					campos: params.campos?.join(',')
				}
			})

			return { data, error: null }
		} catch (error) {
			console.log(error)
			return { data: null, error: (error as AxiosError).response?.data }
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
