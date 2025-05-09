import * as jose from "jose"
import { GraphQLError } from 'graphql'
import { decoratorFactory } from './factory'

const {
    API_WEB3_AUTH_SOCIAL_JWKS
}: NodeJS.Process["env"] = process.env

export function withAuthentication() {

    return decoratorFactory(async function (implementation, args, ...rest) {

        try {

            // // idToken passed from the frontend in the Authorization header
            const idToken = this.req.headers.authorization?.split(' ')[1] as string;
            if (!idToken) throw new GraphQLError("Invalid token");
            const jwks = jose.createRemoteJWKSet(new URL(API_WEB3_AUTH_SOCIAL_JWKS as string)); // for social logins
            const jwtDecoded = await jose.jwtVerify(idToken, jwks, { algorithms: ["ES256"] });

            // jwtDecoded.email
            // get address from email from user this.dataSources.getUser(email)
            // address = user.address


            return implementation.call(this, { ...{ address }, ...args }, ...rest)
        } catch (err) {
            console.error(`Error attempting to access ${err}`)
            throw new GraphQLError('Authentication token is invalid')
        }

    })
}