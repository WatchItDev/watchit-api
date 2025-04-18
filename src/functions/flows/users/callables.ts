import { onCall } from 'firebase-functions/v2/https'
import { HttpsError } from 'firebase-functions/v1/https'
import { enhanceFunction } from '../../manager'
import type { UserInput, User } from '../../../schema/types'
import {requireFields} from "../../utils/validations";

export const usersCreate = onCall(
    { region: 'auto' },
    enhanceFunction(
        async ({ ds }, req): Promise<{ user: User }> => {
            const input = req.data as UserInput
            // validate required fields
            requireFields(input, ['address', 'username', 'displayName', 'bio']);
            if (await ds.Users.getUser(input.address)) {
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
            if (!(await ds.Users.getUser(address))) {
                throw new HttpsError('not-found', 'user does not exist')
            }
            const user = await ds.Users.updateUser(address, data)
            console.log(`✏️  profile updated for ${address}`);
            return { user }
        }
    )
)
