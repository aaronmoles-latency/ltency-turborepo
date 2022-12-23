import { QueryObject } from './QueryObject';

export const enum Country {
	SPAIN,
	USA
}
const legalAgeByCountry = {
	[Country.SPAIN]: 18,
	[Country.USA]: 21,
}

export class FindAvgAgeOfUsersWhoCanDrinkAlcohol<T extends number> implements QueryObject<T> {
	constructor(private readonly country: Country){}

	rawSelect(): string{
		return 'avg(age) as avgAge';
	}

	rawWhere(): {sql: string, params: unknown[]}{
		return { sql: 'age >= ?', params: [legalAgeByCountry[this.country]]}
	}

	parseResult({ avgAge }: {avgAge: number}): T {
		return avgAge as T;
	}
}
