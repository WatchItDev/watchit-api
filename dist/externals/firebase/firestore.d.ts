import { Firestore, CollectionReference, DocumentData, WithFieldValue } from 'firebase-admin/firestore';

/**
 * A generic Firestore DAO.
 * T can be any shape (your GraphQL types, etc.).
 */
declare class CollectionDAO<T> {
    protected admin: Firestore;
    protected ref: CollectionReference<DocumentData>;
    constructor(path: string);
    get(id: string): Promise<T | null>;
    list(limit?: number): Promise<T[]>;
    create(id: string, data: Partial<WithFieldValue<T>>): Promise<void>;
    update(id: string, data: Partial<WithFieldValue<T>>): Promise<void>;
    delete(id: string): Promise<void>;
    ids(limit?: number): Promise<string[]>;
    query(clauses: Array<{
        field: string;
        op: FirebaseFirestore.WhereFilterOp;
        value: unknown;
    }>, limit?: number): Promise<T[]>;
    prefixSearch(field: string, prefix: string, limit?: number): Promise<T[]>;
    sub(id: string, sub: string): CollectionDAO<T>;
    exists(id: string): Promise<boolean>;
}
/** factory for your datasources */
declare function FireStore(): {
    fs: <U>(path: string) => CollectionDAO<U>;
};

export { CollectionDAO, FireStore };
