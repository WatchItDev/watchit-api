/**
 * Populate with methods to handle error tracing.
 * @returns
 */
export default ({ Sentry }) => {
  return {
    didEncounterErrors (ctx) {
      // If we couldn't parse the operation, don't do anything here
      if (!ctx.operation) {
        return
      }

      for (const err of ctx.errors) {
        // Only report internal server errors,
        // all errors extending ApolloError should be user-facing
        // if (err.originalError instanceof ApolloError) {
        //   continue
        // }

        // Add scoped report details and send to Sentry
        Sentry.withScope(scope => {
          // Annotate whether failing operation was query/mutation/subscription
        //   scope.setUser({ id: ctx.context?.id ?? 0, email: ctx.context?.email })
          // scope.setTag('kind', ctx.operation.operation)
          // // Log query and variables as extras
          // scope.setExtra('name', ctx.operationName)
          // scope.setExtra('query', ctx.request.query)
          // scope.setExtra('variables', ctx.request.variables)
          // scope.setExtra('event', ctx.context?.event)
          // scope.setExtra('headers', ctx.context.headers)
          // scope.setExtra('exp', ctx.context.exp)

          if (err.path) {
            // We can also add the path as breadcrumb
            scope.addBreadcrumb({
              category: 'query-path',
              message: err.path.join(' > '),
              level: Sentry.Severity.Debug
            })
          }
          Sentry.captureException(err)
        })
      }
    }
  }
}
