import * as Sentry from '@sentry/node';
import '@sentry/tracing';
// import pj from '@/package.json'
import pluginTracing from '@/infra/monitor/sentry/tracing';

Sentry.init({
  sendDefaultPii: true,
  environment: process.env.NODE_ENV,
  // https://docs.sentry.io/platforms/javascript/configuration/options/
  // debug: process.env.SENTRY_ENV !== 'production',
  dsn: process.env.SENTRY_DSN,
  integrations: [Sentry.captureConsoleIntegration({ levels: ['error', 'debug'] })],
  // release: pj.version,
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

export default () => {
  // For plugin definition see the docs: https://www.apollographql.com/docs/apollo-server/integrations/plugins/
  return {
    requestDidStart(requestContext) {
      return { ...pluginTracing({ Sentry, ...requestContext }) };
    },
  };
};
