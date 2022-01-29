import { container } from "tsyringe";
import { IEmailProvider } from "./IEmailProvider";
import { MailgunProvider } from "./Implementations/MailgunProvider";
import { S3StorageProvider } from "./Implementations/S3StorageProvider";
import { IStorageProvider } from "./IStorage";

container.registerSingleton<IStorageProvider>(
    "StorageProvider",
    S3StorageProvider
)

container.registerSingleton<IEmailProvider>(
    "MailgunProvider",
    MailgunProvider
)