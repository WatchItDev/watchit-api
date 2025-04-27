import { onCall } from "firebase-functions/v2/https";
import { HttpsError } from "firebase-functions/v1/https";
import { enhanceFunction } from "../../manager";
const usersCreate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const existing = await ds.Users.getUser(input.address);
    if (existing) {
      throw new HttpsError("already-exists", "wallet already onboarded");
    }
    const user = await ds.Users.createUser(input);
    console.log(`\u{1F195} profile created for ${user.address}`);
    return { user };
  })
);
const usersUpdate = onCall(
  { region: "auto" },
  enhanceFunction(async ({ ds }, req) => {
    const input = req.data;
    const existing = await ds.Users.getUser(input.address);
    if (!existing) {
      throw new HttpsError("not-found", "user does not exist");
    }
    const user = await ds.Users.updateUser(input.address, input);
    console.log(`\u270F\uFE0F profile updated for ${input.address}`);
    return { user };
  })
);
export {
  usersCreate,
  usersUpdate
};
//# sourceMappingURL=callables.js.map