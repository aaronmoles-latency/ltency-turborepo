import { NewableClass, PrimitiveType, ValueObject } from '@latency/domain';

export const ValueObjectTransformer = <T extends PrimitiveType>(ValueObject: NewableClass<ValueObject<never>>) => {
	return {
		to: (value: ValueObject<T>): T => value.value,
		from: (value: T): ValueObject<T> => new ValueObject(value),
	};
};
