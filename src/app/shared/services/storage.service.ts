import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage: Storage) {
    this._storage.create();
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public async get(key: string): Promise<any> {
    const data = await this._storage?.get(key);
    return data;
  }

  public async remove(key: string): Promise<void>{
    await this._storage?.remove(key);
  }

  public async clear(): Promise<void>{
    await this._storage?.clear();
  }
} 