import * as jwt from 'jsonwebtoken'

export class Authenticator {
    private static EXPIRES_IN = "1day";
    public generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            {
                id: input.id,
                role: input.role
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.EXPIRES_IN
            }
        )
        return token
    }

    public generateTokenBand(input: AuthenticationDataBand): string{
        const token = jwt.sign(
            {
                id: input.id,
                authorization: input.authorization
            },
            process.env.JWT_KEY as string,
            {
                expiresIn: Authenticator.EXPIRES_IN
            }
        )

        return token
    }

    public verifyToken(token: string): AuthenticationData {
        const payload = jwt.verify(token, process.env.JWT_KEY as string) as any
        const result = {
            id: payload.id,
            role: payload.role,
            authorization: payload.authorization
        }
        return result
    }
}

interface AuthenticationData {
    id: string
    role: string
}

interface AuthenticationDataBand{
    id: string
    authorization: number
}