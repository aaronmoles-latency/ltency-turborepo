# 📄 tsconfig

Contains **tsconfig** configs to:

- api: `base.package.json`
- apps: `nextjs.json`
- package: `base.json`
- libraries: `react-library.json`

---

## ⚙️ How to Install

```bash
npm install tsconfig
```

---

## 👀 How to use

### api

Create new `tsconfig.json` file with next content:

```json
{
 "compilerOptions": {
   "outDir": "./dist"
 },
 "extends": "../../packages/tsconfig/base.json",
 "exclude": ["**/*.spec.ts", "**/*.test.ts"],
 "include": ["**/*.ts"]
}
```

### node package

Create new `tsconfig.json` file with next content:

```json
{
  "extends": "tsconfig/base.package.json",
  "exclude": ["**/*.spec.ts", "**/*.test.ts"],
  "include": ["**/*.ts"]
}
```

---

## 🔁 Dependencies
