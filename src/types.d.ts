declare namespace NodeJS {
  interface ProcessEnv {
    WEB3_AUTH_SOCIAL_JWKS: string;
  }
}

declare namespace GQL {
  interface ContextType {
    dataSources: any, 
    services: any
  }
}
