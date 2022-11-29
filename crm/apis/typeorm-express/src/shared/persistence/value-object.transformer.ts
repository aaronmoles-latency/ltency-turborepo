import { Primitives, ValueObject } from '../domain/value-object/ValueObject';
import { NewableClass } from '../newable-class';

export const ValueObjectTransformer = <T extends Primitives>(ValueObject: NewableClass<ValueObject<any>>) => {
	return {
		to: (value: ValueObject<T>): T => value.value,
		from: (value: T): ValueObject<T> => new ValueObject(value),
	};
};
