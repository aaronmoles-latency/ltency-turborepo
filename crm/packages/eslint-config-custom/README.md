# ⚙️ eslint-config-custom

Contains eslint configs to:

- api: `api-express`
- apps: ⚠ Not defined yet ⚠️
- package: `node-package`
- libraries: ⚠ Not defined yet ⚠️

---

## ⚙ How to Install

```bash
npm install eslint-config-custom
```

---

## 👀 How to use

### api

Create new `.eslintrc.js` file with next content:

```jsx
module.exports = {
	ignorePatterns: ['dist', 'node_modules'],
	extends: 'eslint-config-custom/api-express',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
};
```

### node package

Create new `.eslintrc.js` file with next content:

```jsx
module.exports = {
	ignorePatterns: ['dist', 'node_modules'],
	extends: 'eslint-config-custom/node-package',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module',
	},
};
```

---

## 🔁 Dependencies
