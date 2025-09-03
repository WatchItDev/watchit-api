import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  emitLegacyCommonJSImports: false,
  generates: {
    "src/schema": defineConfig({
      resolverTypesPath: "./types.ts",
      mode: "modules",
    }),
  },
};

export default config;
