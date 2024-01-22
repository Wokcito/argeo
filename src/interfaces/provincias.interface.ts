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
	categoria: string
    centroide: Coordenadas
    fuente: string
    id: string
    iso_id: string
    iso_nombre: string
    nombre: string
    nombre_completo: string
}

export interface ProvinciaParams extends RequestParams {
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
