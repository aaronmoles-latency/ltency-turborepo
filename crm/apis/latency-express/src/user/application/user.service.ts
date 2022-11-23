import { Service } from '../../shared/decorators/service.decorator';

@Service()
export default class UserService {
	async run(): Promise<string> {
		return 'user service';
	}
}
