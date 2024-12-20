import { encrypt, decrypt } from '@/utils/encryption'; // 암호화 유틸리티

export type TData = object;

export interface SharedData {
  id: string;
  ownerId: string;
  encryptedData: string; // 암호화된 데이터
  sharedWith: string[];
}

export class IndexedDBManager {
  private dbName = 'myDatabase';
  private version = 1;

  initDB(): Promise<IDBDatabase> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('sharedData')) {
          db.createObjectStore('sharedData', { keyPath: 'id' });
        }
      };
    });
  }

  async addData(data: TData, userId: string, encryptionKey: string): Promise<void> {
    const encryptedData = encrypt(JSON.stringify(data), encryptionKey);
    const sharedData: SharedData = {
      id: crypto.randomUUID(),
      ownerId: userId,
      encryptedData,
      sharedWith: [],
    };

    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sharedData'], 'readwrite');
      const store = transaction.objectStore('sharedData');
      const request = store.add(sharedData);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getAllData(): Promise<SharedData[]> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sharedData'], 'readonly');
      const store = transaction.objectStore('sharedData');
      const request = store.getAll();

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async getData(id: string, encryptionKey: string): Promise<TData> {
    const db = await this.initDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(['sharedData'], 'readonly');
      const store = transaction.objectStore('sharedData');
      const request = store.get(id);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        const encryptedData = request.result.encryptedData;
        const decryptedData = decrypt(encryptedData, encryptionKey) as TData;
        resolve(decryptedData);
      };
    });
  }
}

export const dbManager = new IndexedDBManager();
