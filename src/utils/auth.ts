import { jwtVerify, SignJWT } from "jose";

interface UserJwtPayload {
    jti: string;
    iat: number;
}

export const getJWTSecretKey = () => {
    const secret = process.env.JWT_SECRET_KEY;
    if (!secret || secret.length === 0) {
        throw new Error('JWT_SECRET_KEY not found');
    }
    return secret;
}
export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJWTSecretKey()));
        return verified.payload as UserJwtPayload;
    } catch (err) {
        console.log('Invalid Token');
    }
}