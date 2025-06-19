const path   = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const admin  = require('firebase-admin');

process.env.FIRESTORE_EMULATOR_HOST ??= 'localhost:8080';

function cleanKey(k) { return k ? k.replace(/\\n/g, '\n') : undefined; }

const {
    API_FIREBASE_TYPE,
    API_FIREBASE_PROJECT_ID,
    API_FIREBASE_PRIVATE_KEY_ID,
    API_FIREBASE_PRIVATE_KEY,
    API_FIREBASE_CLIENT_EMAIL,
    API_FIREBASE_CLIENT_ID,
    API_FIREBASE_AUTH_URI,
    API_FIREBASE_TOKEN_URI,
    API_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    API_FIREBASE_CLIENT_X509_CERT_URL,
    API_FIREBASE_UNIVERSE_DOMAIN,
} = process.env;

const adminKey = {
    type:                       API_FIREBASE_TYPE,
    project_id:                 API_FIREBASE_PROJECT_ID,
    private_key_id:             API_FIREBASE_PRIVATE_KEY_ID,
    private_key:                cleanKey(API_FIREBASE_PRIVATE_KEY),
    client_email:               API_FIREBASE_CLIENT_EMAIL,
    client_id:                  API_FIREBASE_CLIENT_ID,
    auth_uri:                   API_FIREBASE_AUTH_URI,
    token_uri:                  API_FIREBASE_TOKEN_URI,
    auth_provider_x509_cert_url:API_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url:       API_FIREBASE_CLIENT_X509_CERT_URL,
    universe_domain:            API_FIREBASE_UNIVERSE_DOMAIN,
};

admin.initializeApp({ credential: admin.credential.cert(adminKey) });

const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

async function batchWrite(docs) {
    let batch  = db.batch();
    let count  = 0;
    const jobs = [];

    for (const { ref, data } of docs) {
        batch.set(ref, data, { merge: true });
        if (++count === 400) {
            jobs.push(batch.commit());
            batch = db.batch();
            count = 0;
        }
    }
    if (count) jobs.push(batch.commit());
    await Promise.all(jobs);
}

module.exports = { db, batchWrite };
