export const Repository = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};
