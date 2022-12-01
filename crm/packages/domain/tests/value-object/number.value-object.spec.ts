import { NumberValueObject } from '../../src';

class CountValueObject extends NumberValueObject {

}

describe('NumberValueObject', () => {
	it('should return true equals with same value', () => {
		const num = 0;
		const number1 = new CountValueObject(num)
		const number2 = new CountValueObject(num)

		expect(number1.equals(number2)).toBeTruthy()
	})

	it('should return false compare of references', () => {
		const num = 0;
		const number1 = new CountValueObject(num)
		const number2 = new CountValueObject(num)

		expect(number1 === number2).toBeFalsy()
	})
})
