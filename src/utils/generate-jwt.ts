import { sign } from 'jsonwebtoken'

/**
 * Genera y retorna un JWT
 * @param { string } secret
 * @param { string } key
 * @returns { string }
 *
 * @see {@link https://datosgobar.github.io/georef-ar-api/jwt-token/}
 */
export function generateJWT (secret: string, key: string): string {
	if (typeof secret !== 'string') {
		throw new Error('The secret is required')
	}

	if (typeof key !== 'string') {
		throw new Error('The key is required')
	}

	const payload = { iss: key }
	return sign(payload, secret, { noTimestamp: true })
}
