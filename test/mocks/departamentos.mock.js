import { http, HttpResponse } from 'msw'
import { MOCKED_API_BASE_URL } from '../../src/constants'

const endpoint = '/api/departamentos'

export const getDepartamentos = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({
		cantidad: 1,
		departamentos: [{
			centroide: {
				lat: -31.6952294494901,
				lon: -60.0411744815271
			},
			id: '30084',
			nombre: 'Paraná',
			provincia: {
				id: '30',
				nombre: 'Entre Ríos'
			}
		}],
		inicio: 0,
		parametros: {
			nombre: 'parana'
		},
		total: 1
	})
})

export const postDepartamentos = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, async ({ request }) => {
	return HttpResponse.json({
		resultados: [
			{
				cantidad: 1,
				departamentos: [{
					centroide: {
						lat: -31.6952294494901,
						lon: -60.0411744815271
					},
					id: '30084',
					nombre: 'Paraná',
					provincia: {
						id: '30',
						nombre: 'Entre Ríos'
					}
				}],
				inicio: 0,
				parametros: {
					nombre: 'parana'
				},
				total: 1
			},
			{
				cantidad: 1,
				departamentos: [{
					centroide: {
						lat: -31.6952294494901,
						lon: -60.0411744815271
					},
					id: '30084',
					nombre: 'Paraná',
					provincia: {
						id: '30',
						nombre: 'Entre Ríos'
					}
				}],
				inicio: 0,
				parametros: {
					nombre: 'parana'
				},
				total: 1
			}
		]
	}
	)
})

export const getDepartamentosError = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})

export const postDepartamentosError = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})
