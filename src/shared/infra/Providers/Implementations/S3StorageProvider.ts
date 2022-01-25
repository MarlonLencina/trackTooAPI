import {pathAvatars} from "@config/multer.config";
import { S3 } from "aws-sdk";
import fs from "fs";
import path from "path";

import { IStorageProvider } from "../IStorage";

export class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.AWS_S3_REGION,
    });
  }

  public async save(folder: string, file: string, type: string): Promise<string> {
    const originalName = path.resolve(pathAvatars, file); // find file
    
    const fileContent = await fs.promises.readFile(originalName); // read file

    await this.client
      .putObject({
        Bucket: `${process.env.AWS_S3_BUCKETNAME}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: type,
      })
      .promise();

    await fs.promises.unlink(originalName);

    return file;
  }

  public async delete(folder: string, file: string): Promise<void> {

    await this.client.deleteObject({
        Bucket: process.env.AWS_S3_BUCKETNAME,
        Key: `${folder}/${file}`,
      }).promise();

  }
}

