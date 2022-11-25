export default class Auth {
	constructor(
		private readonly _id: string,
		private readonly _email: string,
	) {
	}

	get id(): string {
		return this._id;
	}

	get email(): string {
		return this._email;
	}
}
