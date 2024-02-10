import { type ProvinciaParams } from './provincias.interface'
import { type DepartamentoParams } from './departamentos.interface'
import { type MunicipioParams } from './municipios.interface'

export type AllParams =
      ProvinciaParams
      | ProvinciaParams[]
      | DepartamentoParams
      | DepartamentoParams[]
      | MunicipioParams
      | MunicipioParams[]
