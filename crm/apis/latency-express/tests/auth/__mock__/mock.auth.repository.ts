import {AuthRepository} from "../../../src/auth/domain/auth.repository";

export default class MockAuthRepository implements AuthRepository {
    private readonly saveSpy = jest.fn()

    async save(): Promise<void> {
        console.log('SAVE')
        this.saveSpy()
    }

    public toHaveBeenCalledSave() {
        expect(this.saveSpy).toHaveBeenCalled()
    }
}
