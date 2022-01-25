
export interface IStorageProvider {
    save(folder: string, file: string, type: string): Promise<string>;
    delete(folder: string, file: string): Promise<void>;
  }
  