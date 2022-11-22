import { AuthRepository } from '../../domain/auth.repository';

export default class MongoAuthRepository implements AuthRepository {
    async save(): Promise<void> {
        // eslint-disable-next-line no-console
        console.log('SAVE AUTH -> MONGO REPOSITORY')
    }
}
