import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { container } from './container';

export const AppDataSource = container.get(DataSource)
