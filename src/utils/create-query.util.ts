import { type AllParams } from '../interfaces'

export function createQuery (params: AllParams): string {
	if (Array.isArray(params)) throw new Error()

	const filteredParams: Record<string, string> = {}

	Object.entries(params).forEach(([key, value]) => {
		if (value !== undefined) {
			if (key === 'campos') filteredParams[key] = value.join(',')
			filteredParams[key] = value
		}
	})

	return new URLSearchParams(filteredParams).toString()
}
