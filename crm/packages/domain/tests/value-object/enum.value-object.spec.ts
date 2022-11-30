import { EnumValueObject } from '../../src';
import { InvalidArgumentError } from '../../src/error';

enum Vehicle {
	CAR = 'CAR',
	MOTO = 'MOTO',
	BIKE = 'BIKE',
}

class VehicleValueObject extends EnumValueObject<Vehicle> {
	constructor(value: Vehicle) {
		super(value, Object.values(Vehicle));
	}

	protected throwErrorForInvalidValue(value: Vehicle): void {
		throw new InvalidArgumentError(`${value} is not valid value to ${this.constructor.name}`)
	}
}

describe('EnumValueObject', () => {
	it('should return true equals with same value', () => {
		const vehicle1 = new VehicleValueObject(Vehicle.CAR)
		const vehicle2 = new VehicleValueObject(Vehicle.CAR)

		expect(vehicle1.equals(vehicle2)).toBeTruthy()
	})

	it('should return false compare of references', () => {
		const vehicle1 = new VehicleValueObject(Vehicle.CAR)
		const vehicle2 = new VehicleValueObject(Vehicle.CAR)

		expect(vehicle1 === vehicle2).toBeFalsy()
	})

	it('should throws InvalidArgumentException if value is not valid', () => {
		expect(() => new VehicleValueObject('TRICYCLE' as Vehicle))
			.toThrow(InvalidArgumentError)
	})
})
