import {AuthRepository} from "../../domain/auth.repository";

export default class MongoAuthRepository implements AuthRepository {
    async save(): Promise<void> {
        console.log('SAVE AUTH -> MONGO REPOSITORY')
    }
}
