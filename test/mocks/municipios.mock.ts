import { http, HttpResponse } from 'msw'
import { MOCKED_API_BASE_URL } from '../../src/constants'

const endpoint = '/api/municipios'

export const getMunicipios = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({
		cantidad: 1,
		inicio: 0,
		municipios: [
			{
				centroide: {
					lat: -31.7493555782411,
					lon: -60.5012038041556
				},
				id: '300336',
				nombre: 'Paraná',
				provincia: {
					id: '30',
					nombre: 'Entre Ríos'
				}
			}
		]
	})
})

export const postMunicipios = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, async ({ request }) => {
	return HttpResponse.json({
		resultados: [
			{
				cantidad: 1,
				inicio: 0,
				municipios: [
					{
						centroide: {
							lat: -31.7493555782411,
							lon: -60.5012038041556
						},
						id: '300336',
						nombre: 'Paraná',
						provincia: {
							id: '30',
							nombre: 'Entre Ríos'
						}
					}
				]
			},
			{
				cantidad: 1,
				inicio: 0,
				municipios: [
					{
						centroide: {
							lat: -31.7493555782411,
							lon: -60.5012038041556
						},
						id: '300336',
						nombre: 'Paraná',
						provincia: {
							id: '30',
							nombre: 'Entre Ríos'
						}
					}
				]
			}
		]
	}
	)
})

export const getMunicipiosError = http.get(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})

export const postMunicipiosError = http.post(`${MOCKED_API_BASE_URL}${endpoint}`, () => {
	return HttpResponse.json({ message: 'Not Found' }, { status: 404 })
})
