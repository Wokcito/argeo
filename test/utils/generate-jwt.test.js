import { describe, it, expect } from 'vitest'
import { verify, decode } from 'jsonwebtoken'
import { generateJWT } from '../../src/utils'

describe('generateJWT', () => {
	const secret = 'secret'
	const wrongSecret = 'wrongSecret'
	const key = 'key'

	it('must obtain a secret and a key', () => {
		expect(() => generateJWT(undefined, '')).toThrow('The secret is required')
		expect(() => generateJWT('', undefined)).toThrow('The key is required')
	})

	it('must generate and return a valid JWT', () => {
		const token = generateJWT(secret, key)
		expect(generateJWT(secret, key)).toBeTypeOf('string')
		expect(() => verify(token, secret)).not.toThrow()
		expect(() => verify(token, wrongSecret)).toThrow()
	})

	it('must return a JWT with a payload with this format: { iss: key }', () => {
		const token = generateJWT(secret, key)
		const payload = decode(token)
		expect(payload).toBeTypeOf('object')
		expect(payload).toMatchObject({ iss: key })
	})
})
