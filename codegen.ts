import type { CodegenConfig } from '@graphql-codegen/cli'
import { defineConfig } from '@eddeee888/gcg-typescript-resolver-files'

const config: CodegenConfig = {
  schema: '**/*.graphql',
  emitLegacyCommonJSImports: false,
  generates: {
    'src/schema': defineConfig()
  
  },
}

export default config