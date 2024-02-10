import { type Coordenadas } from './coordenadas.interface'
import { type RequestParams } from './request-params.interface'

export interface SeveralProvinciasResponse {
	resultados: ProvinciasResponse[]
}

export interface ProvinciasResponse {
	cantidad: number
	total: number
	inicio: number
	parametros: unknown
	provincias: Provincia[]
}

export interface Provincia {
	id: string
	nombre: string
	centroide?: Coordenadas
	categoria?: string
	fuente?: string
	iso_id?: string
	iso_nombre?: string
	nombre_completo?: string
}

export interface ProvinciaParams extends Omit<RequestParams, 'provincia'> {
	campos?: Field[]
}

type Field =
      'categoria'
      | 'centroide.lat'
      | 'centroide.lon'
      | 'fuente'
      | 'id'
      | 'iso_id'
      | 'iso_nombre'
      | 'nombre'
      | 'nombre_completo'
