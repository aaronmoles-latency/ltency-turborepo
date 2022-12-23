import { Service } from '../../shared/decorators/service.decorator';
import { Country, FindAvgAgeOfUsersWhoCanDrinkAlcohol } from '../domain/query-objects/FindOfLegalAgeUsers';
import { UserRepository } from '../domain/user.repository';

@Service()
export default class CalculateAverageAgeForUsersWhoDrink {
	constructor(
		private readonly userRepository: UserRepository,
	) {
	}

	async execute(): Promise<number> {
		return this.userRepository.rawQuery<number>(new FindAvgAgeOfUsersWhoCanDrinkAlcohol(Country.SPAIN))
	}
}
