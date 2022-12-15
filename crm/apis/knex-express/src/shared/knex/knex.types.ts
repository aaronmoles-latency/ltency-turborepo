import { Knex } from 'knex';

export type InsertEntity<T> = Omit<T, 'created_at' | 'updated_at'>
export type UpdateEntity<T> = Partial<Omit<T, 'id' | 'created_at' | 'updated_at'>>

export type KnexEntity<T> = Knex.CompositeTableType<T, InsertEntity<T>, UpdateEntity<T>>
