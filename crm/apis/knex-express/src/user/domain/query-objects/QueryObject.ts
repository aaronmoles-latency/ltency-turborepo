/**
 * This class should be the last to be used when executing complex queries and can't make them with repositories.
 * We know that these classes using SQL and table names and columns break the hexagonal architecture rule
 * about domain classes knowing nothing about infrastructure, but we do it in our own risk and that's why this is the last resort.
 */
export interface QueryObject<T> {
	rawSelect?(): string;
	rawWhere?(): {sql: string, params: unknown[]};
	rawHaving?(): {sql: string, params: unknown[]};
	rawFullQuery?(): {sql: string, params: unknown[]};

	parseResult?(result: unknown): T;
}
