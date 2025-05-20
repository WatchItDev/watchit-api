
/**
 * Populate with methods to handle performance.
 * @returns
 */
export default ({ Sentry, request }) => {
    if (!request.operationName) return
    // ... create other context fields
    const transaction = Sentry.startTransaction({
      name: request.operationName
    })
  
    return {
      willSendResponse () { // hook for transaction finished
        transaction.finish()
      },
      executionDidStart () {
        return {
          willResolveField ({ info }) {
            // hook for each new resolver
            const span = transaction.startChild({
              op: `resolver ${request.operationName}`,
              description: `${info.parentType.name}.${info.fieldName}`
            })
  
            return () => {
              // this will execute once the resolver is finished
              span?.finish()
            }
          }
        }
      }
    }
  }
  