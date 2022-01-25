import { container } from "tsyringe";
import { S3StorageProvider } from "./Implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorage";

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
)