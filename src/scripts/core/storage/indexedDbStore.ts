/**
 * IndexedDB-Persistenz für die lokale SQLite-Datenbank im Mobile-Modus.
 *
 * Auf Smartphones/Tablets gibt es keine File System Access API – die geteilte
 * Server-Datei kann dort nicht geöffnet werden. Damit Daten trotzdem über
 * Reloads hinweg erhalten bleiben, wird der binäre SQLite-Export (dieselben
 * Bytes wie beim Datei-Persist am Desktop) als Blob in IndexedDB abgelegt.
 *
 * Bewusst getrennt von "psm-file-handles" (pwa.ts), damit FileHandle-Logik und
 * lokale DB-Bytes sich nicht in die Quere kommen.
 */

const DB_NAME = "psm-local-db";
const STORE_NAME = "sqlite-bytes";
const KEY = "current";
const DB_VERSION = 1;

function openStore(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function saveDbBytes(bytes: Uint8Array): Promise<void> {
  const db = await openStore();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      // Kopie ablegen: der ursprüngliche Buffer kann transfer-/wiederverwendet werden.
      tx.objectStore(STORE_NAME).put(bytes.slice(), KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}

export async function loadDbBytes(): Promise<Uint8Array | null> {
  const db = await openStore();
  try {
    return await new Promise<Uint8Array | null>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const request = tx.objectStore(STORE_NAME).get(KEY);
      request.onsuccess = () => {
        const value = request.result;
        if (!value) {
          resolve(null);
        } else if (value instanceof Uint8Array) {
          resolve(value);
        } else if (value instanceof ArrayBuffer) {
          resolve(new Uint8Array(value));
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } finally {
    db.close();
  }
}

export async function hasDbBytes(): Promise<boolean> {
  const bytes = await loadDbBytes().catch(() => null);
  return Boolean(bytes && bytes.byteLength > 0);
}

export async function clearDbBytes(): Promise<void> {
  const db = await openStore();
  try {
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).delete(KEY);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } finally {
    db.close();
  }
}
