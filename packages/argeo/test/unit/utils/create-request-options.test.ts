import { createRequestOptions, generateJWT } from '../../../src/utils'

describe('createRequestOptions', () => {
	const secret = 'secret'
	const key = 'key'

	it('should validate the token', () => {
		expect(() => createRequestOptions({ token: '' })).toThrow()
		expect(() => createRequestOptions({ token: { secret: '', key } })).toThrow()
		expect(() => createRequestOptions({ token: { secret, key: '' } })).toThrow()
		expect(() => createRequestOptions({ token: { secret: 1 as unknown as string, key: '' } })).toThrow()
		expect(() => createRequestOptions({ token: { secret, key: 1 as unknown as string } })).toThrow()
	})

	it('should set the token provided in \'Authorization\' header', () => {
		const token = generateJWT(secret, key)
		const options = createRequestOptions({ token: { secret, key } })
		const headers = options?.headers as Headers
		const existAuthorization = headers.has('Authorization')
		expect(existAuthorization).toBe(true)

		const value = headers.get('Authorization')
		expect(value?.split(' ')).toMatchObject(['Bearer', token])
	})

	it('should set the token generated with the secret and key in \'Authorization\' header', () => {
		const options = createRequestOptions({ token: { secret, key } })
		const headers = options?.headers as Headers
		const existAuthorization = headers.has('Authorization')
		expect(existAuthorization).toBe(true)

		const [type, token] = headers.get('Authorization')?.split(' ') as unknown as string[]
		expect(type).toBe('Bearer')
		expect(token).toMatch(/^[\w-]+\.[\w-]+\.[\w-]+$/)
	})
})
