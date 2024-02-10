import { type ProvinciaParams } from './provincias.interface'
import { type DepartamentoParams } from './departamentos.interface'

export type AllParams =
      ProvinciaParams
      | ProvinciaParams[]
      | DepartamentoParams
      | DepartamentoParams[]
