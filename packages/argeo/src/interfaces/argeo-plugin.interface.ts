import { type ArgeoResponse } from './argeo-response.interface'

export interface ArgeoPlugin {
	interceptResponse: (response: ArgeoResponse<any>) => Promise<any>
}

/*
	TODO: add ArgeoPluginConfig interface in the constructor function
	with the options 'priority: number' and 'endpoints: Endpoint[]'
*/
