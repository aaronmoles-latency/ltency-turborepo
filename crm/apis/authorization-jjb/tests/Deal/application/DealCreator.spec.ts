import { CreateDealParams } from '../../../src/Deal/application/CreateDealParams';
import { DealCreator } from '../../../src/Deal/application/DealCreator';
import { DealRepository } from '../../../src/Deal/domain/DealRepository';

describe('DealCreator', () => {
	it('filters data', () => {
		const mock: DealRepository = {
			create: jest.fn(),
		};

		new DealCreator(mock).run(new CreateDealParams({ fee: 123, id: 'aaaa', name: 'BBBBB' }, 'user1'))
	})
})
