type FunctionAdapter<I, O> = (input: I) => O

export const Adapter = <I, O>(f: FunctionAdapter<I, O>): FunctionAdapter<I, O> => {
	return f
}
