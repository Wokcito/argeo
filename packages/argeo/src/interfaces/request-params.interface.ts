export interface RequestParams {
	id?: string
	nombre?: string
	provincia?: ProvinciaRef
	interseccion?: string
	orden?: string
	aplanar?: boolean
	max?: number
	inicio?: number
	exacto?: boolean
}

interface ProvinciaRef {
	id?: string | string[]
	nombre?: string
}
