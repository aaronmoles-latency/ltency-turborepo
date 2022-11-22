import {Service} from "../../shared/decorators/service.decorator";

@Service()
export default class AuthService {
    async run(): Promise<string> {
        return 'auth service'
    }
}
