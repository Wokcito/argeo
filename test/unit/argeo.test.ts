import { Argeo } from '../../src'
import { generateJWT } from '../../src/utils'
import { DEFAULT_BASE_URL } from '../../src/constants'
import { type AxiosInstance } from 'axios'

describe('Argeo', () => {
	const personalSecret = 'personalSecret'
	const personalKey = 'personalKey'
	const secret = 'secret'
	const key = 'key'

	it(`must use the default baseURL (${DEFAULT_BASE_URL}) if other one is not provided`, () => {
		const argeo = new Argeo() as unknown as { instance: AxiosInstance }
		expect(argeo.instance.defaults.baseURL).toBe(DEFAULT_BASE_URL)
	})

	it('must use the token provided by default unless the secret and key exist', () => {
		const token = generateJWT(secret, key)
		const argeoToken = new Argeo({ token }) as unknown as { instance: AxiosInstance }

		const argeoTokenAuthorization = argeoToken.instance.defaults.headers.Authorization as string
		expect(argeoTokenAuthorization.split(' ')).toMatchObject(['Bearer', token])

		const argeoSecretKey = new Argeo({ token: { secret: personalSecret, key: personalKey } }) as unknown as { instance: AxiosInstance }
		const argeoSecretKeyAuthorization = argeoSecretKey.instance.defaults.headers.Authorization as string
		expect(argeoSecretKeyAuthorization.split(' ')).not.toMatchObject(['Bearer', token])
	})

	it('has all expected methods', async () => {
		const argeo = new Argeo()

		expect(typeof argeo.provincias).toBe('function')
		expect(typeof argeo.departamentos).toBe('function')
		expect(typeof argeo.municipios).toBe('function')
	})
})
