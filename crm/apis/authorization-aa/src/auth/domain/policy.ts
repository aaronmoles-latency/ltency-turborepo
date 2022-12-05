type PolicyAttributes = { included?: string[], excluded?: string[] };
type PolicyIds = { included?: string[], excluded?: string[] };

export default interface Policy {
	result: 'GRANT'|'DENY',
	attributes?: PolicyAttributes
	ids?: PolicyIds
}
