import { generateAxiosInstance, generateJWT } from '../../../src/utils'
import { DEFAULT_BASE_URL, MOCKED_API_BASE_URL } from '../../../src/constants'
import { type Token } from '../../../src/interfaces'

describe('generateAxiosInstance', () => {
	it(`should use the default baseURL (${DEFAULT_BASE_URL}) if other one is not provided`, () => {
		const axiosInstance = generateAxiosInstance({})
		expect(axiosInstance.defaults.baseURL).toBe(DEFAULT_BASE_URL)
	})

	it('should return an instance with a custom baseURL if it is provided', () => {
		const axiosInstance = generateAxiosInstance({ baseURL: MOCKED_API_BASE_URL })
		expect(axiosInstance.defaults.baseURL).toBe(MOCKED_API_BASE_URL)
	})

	it('should return an instance with a authorization token if it is provided', () => {
		const axiosInstance = generateAxiosInstance({ token: generateJWT('secret', 'key') })

		const Authorization = axiosInstance.defaults.headers.Authorization as string
		expect(Authorization).toBeDefined()

		const [type, token] = Authorization.split(' ')
		expect(type).toBe('Bearer')
		expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
	})

	it('should throw error if the token provided is not a JWT or the secret and key are not given', () => {
		expect(() => generateAxiosInstance({ token: 'something' })).toThrowError('The token must be a JWT')
		expect(() => generateAxiosInstance({ token: { key: 'key' } as unknown as Token })).toThrowError('The token secret must be a string')
		expect(() => generateAxiosInstance({ token: { secret: 'secret' } as unknown as Token })).toThrowError('The token key must be a string')
	})
})
