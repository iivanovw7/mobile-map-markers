/**
 * Eslint configuration.
 * @module eslintrc.js
 */
module.exports = {
    'extends': [
        'ts-guard/react',
        'ts-guard/ext-style',
        'plugin:react-hooks/recommended'
    ],
    overrides: [
        {
            files: ['**/*.styled.js'],
            rules: {
                'multiline-ternary': 'off',
            }
        },
        {
            files: ['**/Icon/index.jsx'],
            rules: {
                'template-curly-spacing': 'off',
                'indent': ['error', 4, {
                    'ignoredNodes': ['TemplateLiteral']
                } ]
            }
        }
    ],
};
