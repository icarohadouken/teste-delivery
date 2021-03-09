import * as jwt from 'jsonwebtoken'

export class Authenticator {
    private static EXPIRES_IN = "1day"

    public generateUserToken(input: AuthenticationUserData): string{
        const token = jwt.sign(
            {
                id: input.id
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.EXPIRES_IN
            }
        )
        return token
    }

    public verifyToken(token: string): AuthenticationUserData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any

        const result = {
            id: payload.id,
            authorization: payload.authorization
        }

        return result
    }
}

interface AuthenticationUserData{
    id: number
}