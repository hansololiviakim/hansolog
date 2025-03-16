const commitlintConfig = await import('./commitlint.config.js').then(
  (module) => module.default || module
)
const { rules: commitlintRules } = commitlintConfig

import { dirname } from 'path'
import { fileURLToPath } from 'url'

import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginPrettier from 'eslint-plugin-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      ...Object.fromEntries(
        Object.entries(commitlintRules || {}).filter(([key]) => key !== 'type-enum')
      ),
      // * prettier
      'prettier/prettier': 'error',
      // * next.js & react 관련
      'no-unused-vars': 'warn', // 사용하지 않는 변수 선언 시 경고
      'react/self-closing-comp': 'error', // 불필요한 closing 태그 방지
      'react/jsx-boolean-value': ['error', 'never'], // 불필요한 true값 생략
      'react/no-array-index-key': 'warn', // list의 key로 index 사용 시 경고
      'react/jsx-curly-brace-presence': ['error', { props: 'always', children: 'never' }], // {} 사용 props 필수, children 금지
      // * 코드 정리 & 성능 관련
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          alphabetize: { order: 'asc', caseInsensitive: true },
          'newlines-between': 'always', // 그룹별 개행 강제 적용
        },
      ], // import 순서 정리
      'import/newline-after-import': 'error', // import 후 개행
    },
  },
]

export default eslintConfig
