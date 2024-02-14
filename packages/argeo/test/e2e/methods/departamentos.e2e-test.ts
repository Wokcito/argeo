import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { type SetupServer, setupServer } from 'msw/node'
import { Argeo } from '../../../src'
import {
	getDepartamentos,
	getDepartamentosError,
	postDepartamentos,
	postDepartamentosError
} from '../../mocks'
import { MOCKED_API_BASE_URL } from '../../../src/constants'
import { type DepartamentoParams } from '../../../src/interfaces'

describe('departamentos', () => {
	let argeo: Argeo
	let server: SetupServer

	beforeAll(() => {
		server = setupServer(...[getDepartamentos, postDepartamentos])
		server.listen()
		argeo = new Argeo({ baseURL: MOCKED_API_BASE_URL })
	})
	afterEach(() => { server.resetHandlers() })
	afterAll(() => { server.close() })

	it('returns data of a single search correctly', async () => {
		const correctResponse = await argeo.departamentos({ nombre: 'parana' })
		expect(correctResponse.data).toBeDefined()
		expect(correctResponse.error).toBe(null)

		server.use(...[getDepartamentosError])
		const errorResponse = await argeo.departamentos(undefined as unknown as DepartamentoParams)
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})

	it('returns data of several searchs correctly', async () => {
		const correctResponse = await argeo.departamentos([{ nombre: 'parana' }, { nombre: 'parana' }])
		expect(correctResponse.data).toBeDefined()
		expect(correctResponse.error).toBe(null)

		server.use(...[postDepartamentosError])
		const errorResponse = await argeo.departamentos([])
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})
})
