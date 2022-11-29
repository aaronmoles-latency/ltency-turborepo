import AuthFirebaseAuthenticator from '../../../src/user/application/auth-firebase.authenticator';
import MockAccessTokenGenerator from '../__mock__/mock.access-token.generator';
import MockAuthRepository from '../__mock__/mock.auth.repository';

describe('AuthFirebaseAuthenticator', () => {
	let service: AuthFirebaseAuthenticator;
	let authRepository: MockAuthRepository;
	let accessTokenGenerator: MockAccessTokenGenerator;

	/*
    beforeEach(() => {
        const container = DiTestContainer((builder) => {
            builder.registerAndUse(RegisterService)
            builder.register(UserRepository).use(MockAuthRepository).asSingleton()
        })

        service = container.get(RegisterService)
        authRepository = container.get(UserRepository) as MockAuthRepository;
    });
     */

	beforeEach(() => {
		authRepository = new MockAuthRepository();
		accessTokenGenerator = new MockAccessTokenGenerator();
		service = new AuthFirebaseAuthenticator(authRepository, accessTokenGenerator);
	});

	it('should call save method', async () => {
		// Given
		const token = 'random_token';
		// When
		const jwt = await service.run(token);
		// Then
		expect(jwt).toBeDefined()
	});
});
