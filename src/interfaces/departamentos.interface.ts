import { type Coordenadas } from './coordenadas.interface'
import { type Provincia } from './provincias.interface'
import { type RequestParams } from './request-params.interface'

export interface SeveralDepartamentoResponse {
    resultados: DepartamentoResponse[]
}

export interface DepartamentoResponse {
    cantidad: number
    total: number
    inicio: number
    parametros: unknown
    departamentos: Departamento[]
}

interface Departamento {
    id: string
    nombre: string
    nombre_completo: string
    provincia: Pick<Provincia, 'id' | 'nombre'>
    centroide: Coordenadas
    categoria: 'Departamento'
}

export interface DepartamentoParams extends RequestParams {
    provincia?: Partial<Pick<Provincia, 'id' | 'nombre'>>
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
