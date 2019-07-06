module.exports = {
    trailingComma: 'es5',
    tabWidth: 4,
    semi: false,
    singleQuote: true,
    overrides: [
        {
            files: '*.yml',
            options: {
                semi: true,
                tabWidth: 2
            }
        }
    ]
}