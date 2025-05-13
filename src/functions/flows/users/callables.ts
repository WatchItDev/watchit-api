import { onCall } from 'firebase-functions/v2/https';
import { HttpsError } from 'firebase-functions/v1/https';
import { enhanceFunction } from '../../manager';
import type { User, UserInput, UpdateUserInput } from '../../../schema/types';
import {Address, AuthData} from "../../../types";

export const usersCreate = onCall(
  { region: 'us-central1' },
  enhanceFunction(async ({ ds }, req): Promise<{ user: User }> => {
    const input = req.data as UserInput & AuthData;
    const existing = await ds.Users.getUser(input.address)
    if (existing) {
      throw new HttpsError('already-exists', 'wallet already onboarded');
    }
    const user = await ds.Users.createUser(input);
    console.log(`🆕 profile created for ${user.address}`);
    return { user };
  })
);

export const usersUpdate = onCall(
  { region: 'us-central1' },
  enhanceFunction(async ({ ds }, req): Promise<{ user: User }> => {
    const input = req.data as UpdateUserInput & Address;
    const existing = await ds.Users.getUser(input.address);
    if (!existing) {
      throw new HttpsError('not-found', 'user does not exist');
    }
    const user = await ds.Users.updateUser(input.address, input);
    console.log(`✏️ profile updated for ${input.address}`);
    return { user };
  })
);
