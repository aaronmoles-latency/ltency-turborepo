import { Service } from '../../shared/decorators/service.decorator';

@Service()
export default class DashboardService {
	async run(): Promise<string> {
		return 'dashboard service';
	}
}
