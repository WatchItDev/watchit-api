/**
 * Code Convention:
 *
 * - Usage of JSDoc for comprehensive documentation of each method, including parameters and potential exceptions.
 * - Descriptive method names following a verb-based approach to clearly indicate specific actions
 *   (e.g., getCardData, getCardBalance, triggerCardRequest).
 * - Utilization of decorators to enhance code readability and modularity.
 * - Implementation of proper error handling, with detailed exceptions for possible issues.
 * - Well-organized import statements and comments to effectively divide and describe key sections.
 * - Consistent indentation for improved readability.
 * - Maintaining a clean and consistent coding style throughout.
 *
 * Verbs Convention:
 *
 * 1. **add:**
 *    - Used for methods that add new data or elements (e.g., addCard, addCustomer).
 * 2. **set:**
 *    - Used for methods that set or update data (e.g., setPin).
 * 3. **get:**
 *    - Employed for methods that retrieve or fetch data (e.g., getCardData, getCardBalance).
 * 4. **trigger:**
 *    - Indicates methods that initiate a specific process or action (e.g., triggerCardRequest, triggerCardActivation).
 * 5. **toggle:**
 *    - Applied to methods that switch between two states (e.g., toggleCardLockStatus).
 * 6. **upsert:**
 *    - Used for methods that insert a new document into a collection if it does not exist or update an existing document if it does (e.g., upsertCustomer).
 *
 * However, if necessary, other verbs may be used to better describe the function's purpose.
 * This convention promotes code understanding, maintenance, and collaboration,
 * adhering to best practices in JavaScript development.
 *
 * @memberof module:Firebase
 * @description Firebase module to handle messaging services.
 */

import { getFirestore as adminFirestore } from 'firebase-admin/firestore'
import { App } from './app'

export const FireStore = () => {
  const admin = App().getAdmin()
  const db = adminFirestore(admin)

  function getCollection (collectionName: string) {
    
  }
  

  return {
   getCollection
  }
}
