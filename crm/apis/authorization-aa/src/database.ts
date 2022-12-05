import 'reflect-metadata';

import { DataSource } from '@latency/typeorm';

import { container } from './container';

export const AppDataSource = container.get(DataSource)
