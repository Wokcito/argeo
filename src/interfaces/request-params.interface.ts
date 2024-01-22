import { type Formato } from './formato.type'

export interface RequestParams {
    id?: string
    nombre?: string
    interseccion?: string
    orden?: string
    aplanar?: boolean
    campos?: unknown
    max?: number
    inicio?: number
    exacto?: boolean
    formato?: Formato
}
