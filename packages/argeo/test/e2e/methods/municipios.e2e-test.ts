import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest'
import { type SetupServer, setupServer } from 'msw/node'
import { Argeo } from '../../../src'
import {
	getMunicipios,
	getMunicipiosError,
	postMunicipios,
	postMunicipiosError
} from '../../mocks'
import { MOCKED_API_BASE_URL } from '../../../src/constants'
import { type MunicipioParams } from '../../../src/interfaces'

describe('municipios', () => {
	let argeo: Argeo
	let server: SetupServer

	beforeAll(() => {
		server = setupServer(...[getMunicipios, postMunicipios])
		server.listen()
		argeo = new Argeo({ baseURL: MOCKED_API_BASE_URL })
	})
	afterEach(() => { server.resetHandlers() })
	afterAll(() => { server.close() })

	it('returns data of a single search correctly', async () => {
		const correctResponse = await argeo.municipios({ nombre: 'Uruguay' })
		expect(correctResponse.data).toBeDefined()
		expect(correctResponse.error).toBe(null)

		server.use(...[getMunicipiosError])
		const errorResponse = await argeo.municipios(undefined as unknown as MunicipioParams)
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})

	it('returns data of several searchs correctly', async () => {
		const correctResponse = await argeo.municipios([{ nombre: 'Uruguay' }, { nombre: 'Uruguay' }])
		expect(Array.isArray(correctResponse.data)).toBe(true)
		expect(correctResponse.error).toBe(null)

		server.use(...[postMunicipiosError])
		const errorResponse = await argeo.municipios([])
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})
})
