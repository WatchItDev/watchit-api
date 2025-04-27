import * as _firebase_app from '@firebase/app';
import * as firebase_admin_app from 'firebase-admin/app';

declare const App: () => {
    getAdmin: () => firebase_admin_app.App;
    getClient: () => _firebase_app.FirebaseApp;
    clientKey: {
        apiKey: string;
        authDomain: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
    adminKey: {
        type: string;
        project_id: string;
        private_key_id: string;
        private_key: string;
        client_email: string;
        client_id: string;
        auth_uri: string;
        token_uri: string;
        auth_provider_x509_cert_url: string;
        client_x509_cert_url: string;
        universe_domain: string;
    };
};

export { App };
