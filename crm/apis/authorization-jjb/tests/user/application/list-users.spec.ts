import ListUsers from '../../../src/user/application/list-users';
import MockUserRepository from '../__mock__/mock.user.repository';

describe('ListUsers', () => {
	let service: ListUsers;
	let repository: MockUserRepository;

	/*
    beforeEach(() => {
        const container = DiTestContainer((builder) => {
            builder.registerAndUse(RegisterService)
            builder.register(UserRepository).use(MockUserRepository).asSingleton()
        })

        service = container.get(RegisterService)
        authRepository = container.get(UserRepository) as MockUserRepository;
    });
     */

	beforeEach(() => {
		repository = new MockUserRepository();
		service = new ListUsers(repository);
	});

	it('should return user', async () => {
		// Given
		// When
		const users = await service.execute();
		// Then
		expect(users).toBeDefined()
	});
});
