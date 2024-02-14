import { Argeo } from '../../src'
import { generateJWT } from '../../src/utils'
import { DEFAULT_BASE_URL } from '../../src/constants'

describe('Argeo', () => {
	const secret = 'secret'
	const key = 'key'

	it(`should use the default baseURL (${DEFAULT_BASE_URL}) if other one is not provided`, () => {
		const argeo = new Argeo()
		const baseURL = argeo.getBaseURL()
		expect(baseURL).toBe(DEFAULT_BASE_URL)
	})

	it('should set the token provided in the options', () => {
		const token = generateJWT(secret, key)
		const argeo = new Argeo({ token })

		const options = argeo.getOptions()
		const headers = options?.headers as Headers
		const existAuthorization = headers.has('Authorization')
		expect(existAuthorization).toBe(true)

		const value = headers.get('Authorization')
		expect(value?.split(' ')).toMatchObject(['Bearer', token])
	})

	it('should set the token generated with the secret and key in the options', () => {
		const argeo = new Argeo({ token: { secret, key } })

		const options = argeo.getOptions()
		const headers = options?.headers as Headers
		const existAuthorization = headers.has('Authorization')
		expect(existAuthorization).toBe(true)

		const [type, token] = headers.get('Authorization')?.split(' ') as unknown as string[]
		expect(type).toBe('Bearer')
		expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
	})

	it('should have all expected methods', async () => {
		const argeo = new Argeo()

		expect(typeof argeo.provincias).toBe('function')
		expect(typeof argeo.departamentos).toBe('function')
		expect(typeof argeo.municipios).toBe('function')
	})
})
