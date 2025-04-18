import { HttpsError } from 'firebase-functions/v1/https';

/**
 * Throws an HttpsError('invalid-argument') if any of the listed fields
 * on `input` are missing (undefined, null or empty string).
 *
 * @param input  Object to validate
 * @param fields Array of keys that must exist and be truthy
 */
export function requireFields<T extends Record<string, any>>(
    input: T,
    fields: (keyof T)[]
): void {
    const missing = fields.filter((field) => {
        const v = input[field];
        return v === undefined || v === null || v === '';
    });

    if (missing.length > 0) {
        const plural = missing.length > 1 ? 'fields' : 'field';
        throw new HttpsError(
            'invalid-argument',
            `Missing required ${plural}: ${missing.join(', ')}`
        );
    }
}
