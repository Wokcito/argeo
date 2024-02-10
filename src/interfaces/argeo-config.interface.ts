export interface ArgeoConfig {
	baseURL?: string
	token?: string | Token
}

export interface Token {
	secret: string
	key: string
}
