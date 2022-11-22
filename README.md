# Latency Turborepo

This repository is a possible example of Latency monorepository.

## 🏎 Turborepo

This project is build with **Turborepo** to manage all projects of organization.

You can read documentation here: https://turbo.build/repo.

And you can watch a example video: https://www.youtube.com/watch?v=sHff8Ba9SbM 

## 🗂 NPM Workspaces

All projects that contains monorepo are managed with **NPM Workspaces**.  
So, independently of programming language each one have a `package.json` to manage scripts and dependencies between them.

## 📂 Structure

The structure of projects is very simply.
- **crm**: contains projects of CRM.
  - apps: next js apps
  - apis: backend projects
  - components: react components libraries
  - packages: common packages like eslint, tsconfig and other utilities.
- **data**: projects of data. On the future we can create substructure inside this folder.
  - data-importer
  - date-validator
- **gitops**: projects to manage infrastructure.
  - config: project with Kustomization config with 2 environments (stagging, production)
  - infrastructure: Terraform project with necessary scripts.

## 📊 Detect changes

To detect changes we only need to execute a command like this:

```bash
turbo run build --filter="...[main...my-feature]"
```
