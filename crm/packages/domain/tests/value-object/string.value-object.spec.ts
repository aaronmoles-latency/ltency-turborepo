import { StringValueObject } from '../../src';

class NameValueObject extends StringValueObject {

}

describe('StringValueObject', () => {
	it('should return true equals with same value', () => {
		const name = 'NAME';
		const name1 = new NameValueObject(name)
		const name2 = new NameValueObject(name)

		expect(name1.equals(name2)).toBeTruthy()
	})

	it('should return false compare of references', () => {
		const name = 'NAME';
		const name1 = new NameValueObject(name)
		const name2 = new NameValueObject(name)

		expect(name1 === name2).toBeFalsy()
	})
})
