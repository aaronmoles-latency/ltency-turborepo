import { Adapter } from '@latency/core';

import User from '../user';
import UserDto from './user.dto';

export const UserDtoAdapter = Adapter<User, UserDto>((user) => ({
	id: user.id.value,
	name: user.name.value,
	roleId: user.roleId.value,
}))
