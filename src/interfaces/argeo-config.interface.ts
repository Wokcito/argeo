export interface ArgeoConfig {
	baseURL?: string
	token?: string | Token
}

interface Token {
	secret: string
	key: string
}
