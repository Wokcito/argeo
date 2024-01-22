import { describe, it, expect } from 'vitest'
import { generateAxiosInstance, generateJWT } from '../../src/utils'
import { DEFAULT_BASE_URL } from '../../src/constants'

describe('generateAxiosInstance', () => {
	const customBaseURL = 'https://custombaseurl.com'
	const bearer = 'Bearer'

	it(`must use the default baseURL (${DEFAULT_BASE_URL}) if other one is not provided`, () => {
		const axiosInstance = generateAxiosInstance({})
		expect(axiosInstance.defaults.baseURL).toBe(DEFAULT_BASE_URL)
	})

	it('must return an instance with a custom baseURL if it is provided', () => {
		const axiosInstance = generateAxiosInstance({ baseURL: customBaseURL })
		expect(axiosInstance.defaults.baseURL).toBe(customBaseURL)
	})

	it('must return an instance with a authorization token if it is provided', () => {
		const axiosInstance = generateAxiosInstance({ token: generateJWT('secret', 'key') })

		const Authorization = axiosInstance.defaults.headers.Authorization
		expect(Authorization).toBeDefined()

		const [type, token] = Authorization.split(' ')
		expect(type).toBe(bearer)
		expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
	})

	it('throws if the token provided is not a JWT', () => {
		expect(() => generateAxiosInstance({ token: 'something' })).toThrowError('The token must be a JWT')
	})
})
