import { type Formato } from './formato.type'

export interface RequestParams {
	id?: string
	nombre?: string
	provincia?: ProvinciaRef
	interseccion?: string
	orden?: string
	aplanar?: boolean
	campos?: unknown
	max?: number
	inicio?: number
	exacto?: boolean
	formato?: Formato
}

interface ProvinciaRef {
	id?: string | string[]
	nombre?: string
}
