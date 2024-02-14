import { type ProvinciaParams } from '../../../src/interfaces'
import { createQuery } from '../../../src/utils'

describe('createQuery', () => {
	it('should parse the symbol ´', () => {
		const params: ProvinciaParams = { nombre: 'Ríos' }
		const query = createQuery(params)
		expect(query).toBe('nombre=R%C3%ADos')
	})

	it('should parse the spaces', () => {
		const params: ProvinciaParams = { nombre: 'Entre Ríos' }
		const query = createQuery(params)
		expect(query).toBe('nombre=Entre+R%C3%ADos')
	})

	it('should parse correctly the field \'campos\'', () => {
		const params: ProvinciaParams = { campos: ['categoria', 'id'] }
		const query = createQuery(params)
		expect(query).toBe('campos=categoria%2Cid')
	})

	it('should omit the fields with a undefined value', () => {
		const params: ProvinciaParams = { nombre: 'Entre Ríos', campos: undefined, id: undefined }
		const query = createQuery(params)
		expect(query).toBe('nombre=Entre+R%C3%ADos')
	})
})
