import { type Coordenadas } from './coordenadas.interface'
import { type Provincia } from './provincias.interface'
import { type RequestParams } from './request-params.interface'

export interface SeveralMunicipiosResponse {
	resultados: MunicipiosResponse[]
}

export interface MunicipiosResponse {
	cantidad: number
	total: number
	inicio: number
	parametros: unknown
	municipios: Municipio[]
}

interface Municipio {
	id: string
	nombre: string
	provincia?: ProvinciaRef
	centroide?: Coordenadas
	categoria?: string
	fuente?: string
}

interface ProvinciaRef extends Partial<Pick<Provincia, 'id' | 'nombre'>> {
	interseccion?: unknown
}

export interface MunicipioParams extends RequestParams {
	campos?: Field[]
}

type Field =
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
