import { Adapter } from '../src';

type Input = {
	id: number,
	name: string,
}

type Output = {
	_id: number,
	fullName: string,
}

const CustomAdapter = Adapter<Input, Output>((input) => ({ _id: input.id, fullName: input.name }))

describe('Adapter', () => {
	it('should receive input and return Output type', () => {
		const input: Input = { id: 1, name: 'Latency' };

		const output = CustomAdapter(input)

		expect(output).toEqual({ _id: 1, fullName: 'Latency' })
	})
})
