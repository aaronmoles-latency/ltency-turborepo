import RegisterService from "../../../src/auth/application/register.service";
import MockAuthRepository from "../__mock__/mock.auth.repository";

describe('tests', () => {
    let service: RegisterService;
    let authRepository: MockAuthRepository;

    /*
    beforeEach(() => {
        const container = DiTestContainer((builder) => {
            builder.registerAndUse(RegisterService)
            builder.register(AuthRepository).use(MockAuthRepository).asSingleton()
        })

        service = container.get(RegisterService)
        authRepository = container.get(AuthRepository) as MockAuthRepository;
    });
     */

    beforeEach(() => {
        authRepository = new MockAuthRepository();
        service = new RegisterService(authRepository)
    });

    it('should call save method', async () => {
        // Given
        // When
        await service.run()
        // Then
        authRepository.toHaveBeenCalledSave()
    });
});
