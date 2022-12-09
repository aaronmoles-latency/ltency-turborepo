import { Deal } from './Deal';

export abstract class DealRepository {
	abstract create(deal: Deal): Promise<void>
}
