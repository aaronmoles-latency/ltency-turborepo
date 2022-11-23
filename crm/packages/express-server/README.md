# 📤 express-server

Easy mode to create a fast and simply api. Basically is an abstraction of Express server.

---

## ⚙️ How to Install

```bash
npm install @latency/express-server
```

---

## 👀 How to use

To use this library previously we need to create a `CustomDotEnv`. It consists on create a class that extends of `DotEnv<Env>`.

```tsx
import { Request, Response, Router } from 'express';
import { Env, Logger, Server } from '@latency/express-server';

const registerRoutes = (router: Router) => {
	router.get('/path', (req: Request, res: Response) => {
		res.send({ body: 'success' })
	});
}

const logger = new SystemLogger();
const envService = new CustomDotEnv();

const server = new Server({
	logger,
	envService,
	registerRoutes,
});

this.server.listen();
```

---

## 🔁 Dependencies
