import { Logger, SystemLogger } from '../../src';

describe('SystemLogger', () => {
	let logger: Logger;

	beforeAll(() => {
		logger = new SystemLogger()
	})

	it('should log info message', () => {
		logger.info('Info message')
	})

	it('should log debug message', () => {
		logger.debug('Info message')
	})

	it('should log error message', () => {
		logger.error('Info message')
	})
});
