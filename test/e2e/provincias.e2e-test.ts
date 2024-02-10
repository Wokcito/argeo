import { type SetupServer, setupServer } from 'msw/node'
import { Argeo } from '../../src'
import {
	getProvincias,
	getProvinciasError,
	postProvincias,
	postProvinciasError
} from '../mocks'
import { MOCKED_API_BASE_URL } from '../../src/constants'
import { type ProvinciaParams } from '../../src/interfaces'

describe('provincias', () => {
	let argeo: Argeo
	let server: SetupServer

	beforeAll(() => {
		server = setupServer(...[getProvincias, postProvincias])
		server.listen()
		argeo = new Argeo({ baseURL: MOCKED_API_BASE_URL })
	})
	afterEach(() => { server.resetHandlers() })
	afterAll(() => { server.close() })

	it('returns data of a single search correctly', async () => {
		const correctResponse = await argeo.provincias({ nombre: 'Entre rios' })
		expect(correctResponse.data).toBeDefined()
		expect(correctResponse.error).toBe(null)

		server.use(...[getProvinciasError])
		const errorResponse = await argeo.provincias(undefined as unknown as ProvinciaParams)
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})

	it('returns data of several searchs correctly', async () => {
		const correctResponse = await argeo.provincias([{ nombre: 'Entre rios' }, { nombre: 'Entre rios' }])
		expect(correctResponse.data).toBeDefined()
		expect(correctResponse.error).toBe(null)

		server.use(...[postProvinciasError])
		const errorResponse = await argeo.provincias([])
		expect(errorResponse.data).toBe(null)
		expect(errorResponse.error).toBeDefined()
	})
})
