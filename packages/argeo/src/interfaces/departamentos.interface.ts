import { type Coordenadas } from './coordenadas.interface'
import { type Provincia } from './provincias.interface'
import { type RequestParams } from './request-params.interface'

export interface SeveralDepartamentosResponse {
	resultados: DepartamentosResponse[]
}

export interface DepartamentosResponse {
	cantidad: number
	total: number
	inicio: number
	parametros: unknown
	departamentos: Departamento[]
}

interface Departamento {
	id: string
	nombre: string
	nombre_completo?: string
	provincia?: ProvinciaRef
	centroide?: Coordenadas
	categoria?: string
	fuente?: string
}

interface ProvinciaRef extends Partial<Pick<Provincia, 'id' | 'nombre'>> {
	interseccion?: unknown
}

export interface DepartamentoParams extends RequestParams {
	campos?: DepartamentoField[]
}

type DepartamentoField =
      'categoria'
      | 'centroide.lat'
      | 'centroide.lon'
      | 'fuente'
      | 'id'
      | 'nombre'
      | 'nombre_completo'
      | 'provincia.id'
      | 'provincia.interseccion'
      | 'provincia.nombre'
