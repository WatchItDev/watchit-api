import '@sentry/tracing'
import * as Sentry from '@sentry/node'

// import pj from '@/package.json'
import pluginPerformance from '@/sentry/performance'
import pluginTracing from '@/sentry/tracing'

Sentry.init({
  environment: process.env.NODE_ENV,
  // https://docs.sentry.io/platforms/javascript/configuration/options/
  // debug: process.env.SENTRY_ENV !== 'production',
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: true,
  // release: pj.version,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0
})

export default () => {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  return {
    requestDidStart (args) {
      return {
        ...pluginPerformance({ Sentry, ...args }),
        ...pluginTracing({ Sentry, ...args })
      }
    }
  }
}
