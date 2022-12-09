import User from '../../../src/user/domain/user';
import { RoleIdMother } from './role-id.mother';
import { UserIdMother } from './user-id.mother';
import UserNameMother from './user-name.mother';

export default class UserMother {
	static create(
		id = UserIdMother.random(),
		name = UserNameMother.random(),
		roleId = RoleIdMother.random(),
	) {
		return new User(id, name, roleId)
	}
}
