export const Service = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return target;
	};
};

export const SecureService = (): ClassDecorator => {
	return <TFunction extends Function>(target: TFunction): TFunction => {
		return new Proxy(target, {
			apply(t: TFunction, thisArg: any, argArray: any[]): any {
				if (t.name === 'handle') {
					return {}
				}
			},
		});
	};
};
