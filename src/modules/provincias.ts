import { type AxiosError, type AxiosInstance } from 'axios'
import {
	type SeveralProvinciasResponse,
	type ProvinciaFindParams,
	type ProvinciasResponse,
	type ArgeoResponse
} from '../interfaces'

export class Provincias {
	private readonly endpoint = '/api/provincias'

	constructor(
        private readonly instance: AxiosInstance
	) {}

	async buscar<T = ProvinciasResponse>(params: ProvinciaFindParams): Promise<ArgeoResponse<T>>
	async buscar<T = SeveralProvinciasResponse>(params: ProvinciaFindParams[]): Promise<ArgeoResponse<T>>
	async buscar<T = ProvinciasResponse | SeveralProvinciasResponse>(params: ProvinciaFindParams | ProvinciaFindParams[] = {}): Promise<ArgeoResponse<T>> {
		try {
			if (Array.isArray(params)) {
				const { data } = await this.instance.post(this.endpoint, { provincias: params })
				return { data, error: null }
			}

			const { data } = await this.instance.get(this.endpoint, {
				params: {
					...params,
					campos: params.campos?.join(',')
				}
			})
			return { data, error: null }
		} catch (error) {
			return { data: null, error: (error as AxiosError).response?.data }
		}
	}
}
