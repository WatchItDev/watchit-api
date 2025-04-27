import { onDocumentCreated, onDocumentUpdated } from "firebase-functions/v2/firestore";
const logUserCreated = onDocumentCreated(
  "users/{wallet}",
  (event) => {
    console.log(`\u{1F525} Trigger fired: user ${event.params.wallet} created`);
  }
);
const logUserUpdated = onDocumentUpdated(
  "users/{wallet}",
  (event) => {
    console.log(`\u{1F525} Trigger fired: user ${event.params.wallet} updated`);
  }
);
export {
  logUserCreated,
  logUserUpdated
};
//# sourceMappingURL=triggers.js.map