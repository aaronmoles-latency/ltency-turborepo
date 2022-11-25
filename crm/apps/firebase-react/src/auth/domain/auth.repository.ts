export default interface AuthRepository {
    authFirebase(idToken: string): Promise<string>
}
