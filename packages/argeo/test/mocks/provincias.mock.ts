import { http, HttpResponse } from 'msw'
import { MOCKED_API_BASE_URL } from '../../src/constants'

const endpoint = '/api/provincias'

export const getProvincias = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({
		cantidad: 1,
		inicio: 0,
		parametros: { nombre: 'Entre rios' },
		provincias: [{ centroide: { lat: -32.0589278938558, lon: -59.201262616496 }, id: '30', nombre: 'Entre Ríos' }],
		total: 1
	})
})

export const postProvincias = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, async () => {
	return HttpResponse.json({
		resultados: [
			{
				cantidad: 1,
				inicio: 0,
				parametros: { nombre: 'Entre rios' },
				provincias: [{ centroide: { lat: -32.0589278938558, lon: -59.201262616496 }, id: '30', nombre: 'Entre Ríos' }],
				total: 1
			},
			{
				cantidad: 1,
				inicio: 0,
				parametros: { nombre: 'Entre rios' },
				provincias: [{ centroide: { lat: -32.0589278938558, lon: -59.201262616496 }, id: '30', nombre: 'Entre Ríos' }],
				total: 1
			}
		]
	})
})

export const getProvinciasError = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})

export const postProvinciasError = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})
