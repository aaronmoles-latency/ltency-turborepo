type PolicyDimensions = Record<string, string[]>
type PolicyIncludes = { included?: string[], excluded?: string[] };

export type UserPolicy = PolicyDimensions;

export type ObjectPolicy = {
	dimensions: PolicyDimensions,
	attributes: PolicyIncludes
}

export type InstancePolicy = PolicyIncludes;
