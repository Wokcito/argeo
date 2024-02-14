import { type ArgeoPlugin } from './argeo-plugin.interface'

export interface ArgeoConfig {
	baseURL?: string
	token?: string | Token
	plugins?: ArgeoPlugin[]
}

export interface Token {
	secret: string
	key: string
}
