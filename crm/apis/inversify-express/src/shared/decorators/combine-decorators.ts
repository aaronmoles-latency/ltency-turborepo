export function combineDecorators(
	...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
) {
	return <TFunction extends Function, Y>(
		target: TFunction | object,
		propertyKey?: string | symbol,
		descriptor?: TypedPropertyDescriptor<Y>,
	) => {
		for (const decorator of decorators) {
			if (target instanceof Function && !descriptor) {
				(decorator as ClassDecorator)(target);
				// eslint-disable-next-line no-continue
				continue;
			}
			(decorator as MethodDecorator | PropertyDecorator)(
				target,
				propertyKey!,
				descriptor!,
			);
		}
	};
}
