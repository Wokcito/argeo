module.exports = {
	extends: 'standard-with-typescript',
	rules: {
		'@typescript-eslint/indent': ['warn', 'tab'],
		'quotes': ['warn', 'single'],
		'no-tabs': 'off'
	},
	ignorePatterns: ['.eslintrc.cjs'],
	overrides: [
		{
			files: ['*.js', '*.ts'],
			env: {
				browser: true,
				es2021: true,
				node: true
			},
			parserOptions: {
				ecmaVersion: 'latest',
				sourceType: 'module'
			}
		}
	]
}
