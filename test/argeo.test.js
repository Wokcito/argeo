import { describe, it, expect } from 'vitest'
import { Argeo } from '../src'
import { generateJWT } from '../src/utils'

describe('Argeo', () => {
	const baseURL = 'https://apis.datos.gob.ar/georef/api'
	const personalSecret = 'personalSecret'
	const personalKey = 'personalKey'
	const secret = 'secret'
	const key = 'key'

	it(`must use the default baseURL (${baseURL}) if other one is not provided`, () => {
		const argeo = new Argeo()
		expect(argeo.instance.defaults.baseURL).toBe(baseURL)
	})

	it('must use the token provided by default unless the secret and key exist', () => {
		const token = generateJWT(secret, key)
		const argeoToken = new Argeo({ token, secret })

		const argeoTokenAuthorization = argeoToken.instance.defaults.headers.Authorization
		expect(argeoTokenAuthorization).toBeDefined()
		expect(argeoTokenAuthorization.split(' ')).toMatchObject(['Bearer', token])

		const argeoSecretKey = new Argeo({ secret: personalSecret, key: personalKey })
		const argeoSecretKeyAuthorization = argeoSecretKey.instance.defaults.headers.Authorization
		expect(argeoSecretKeyAuthorization).toBeDefined()
		expect(argeoSecretKeyAuthorization.split(' ')).not.toMatchObject(['Bearer', token])
	})

	it('throws error if one of the given parameters don\'t have the correct type', () => {
		expect(() => new Argeo({ baseURL: 1 })).toThrowError('The baseURL must be a string')
		expect(() => new Argeo({ secret: 1 })).toThrowError('The secret must be a string')
		expect(() => new Argeo({ token: 1 })).toThrowError('The token must be a string')
		expect(() => new Argeo({ key: 1 })).toThrowError('The key must be a string')
	})
})
