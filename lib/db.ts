import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Transaction } from '@/types';

interface ZorvynDB extends DBSchema {
  transactions: {
    key: string;
    value: Transaction;
    indexes: { 'by-date': string };
  };
}

let dbPromise: Promise<IDBPDatabase<ZorvynDB>> | null = null;

export const getDB = () => {
  if (typeof window === 'undefined') return null; // Prevent SSR errors
  if (!dbPromise) {
    dbPromise = openDB<ZorvynDB>('zorvyn-finance-db', 1, {
      upgrade(db) {
        const store = db.createObjectStore('transactions', { keyPath: 'id' });
        store.createIndex('by-date', 'date');
      },
    });
  }
  return dbPromise;
};