export abstract class AuthRepository {
    abstract save(): Promise<void>;
}
