import 'reflect-metadata';
import { onCall } from 'firebase-functions/v2/https'
import { HttpsError } from 'firebase-functions/v1/https'
import { enhanceFunction } from '../../manager'
import type { User } from '../../../schema/types'
import { plainToInstance } from 'class-transformer'
import { validateOrReject } from 'class-validator'
import { CreateUserDto } from "./decorators";

export const usersCreate = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ user: User }> => {
            const input = plainToInstance(CreateUserDto, req.data)
            await validateOrReject(input).catch((errors: any) => {
                throw new HttpsError('invalid-argument', 'Validation failed: ' + JSON.stringify(errors))
            })
            const existing = await ds.Users.getUser(input.address)
            if (existing) {
                throw new HttpsError('already-exists', 'wallet already onboarded')
            }

            const user = await ds.Users.createUser(input)
            console.log(`🆕 profile created for ${user.address}`);
            return { user }
        }
    )
)

export const usersUpdate = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ user: User }> => {
            const data = req.data as Partial<User> & { address?: string }
            const address = data.address
            if (!address) throw new HttpsError('invalid-argument', 'address required')
            const existing = await ds.Users.getUser(address)
            if (!existing) {
                throw new HttpsError('not-found', 'user does not exist')
            }
            const user = await ds.Users.updateUser(address, data)
            console.log(`✏️  profile updated for ${address}`);
            return { user }
        }
    )
)
