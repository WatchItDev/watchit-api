import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files';
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '**/schema.graphql',
  emitLegacyCommonJSImports: false,
  generates: {
    'src/schema': defineConfig({
      resolverTypesPath: './types.ts',
      mode: 'modules',
      typesPluginsConfig: {
        contextType: 'GQL.ContextType',
      },
    }),
  },
};

export default config;
