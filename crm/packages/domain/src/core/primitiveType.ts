import { Primitives as CodelyPrimitives } from '@codelytv/primitives-type';

export type PrimitiveType = string | number |boolean | Date;

export type Primitives<T> = CodelyPrimitives<T>;
