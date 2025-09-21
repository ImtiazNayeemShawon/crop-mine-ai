import { S3 } from "aws-sdk";
import { S3Client, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { tmpdir } from "os";
import { join } from "path";
import { writeFileSync, createReadStream } from "fs";
import { randomUUID } from "crypto";

const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY!,
  secretAccessKey: process.env.S3_SECRET_KEY!,
  region: process.env.S3_REGION || "ap-southeast-2",
});

const s3Client = new S3Client({
  region: process.env.S3_REGION!,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY!,
    secretAccessKey: process.env.S3_SECRET_KEY!,
  },
});

export const uploadFile = async (file: File, key?: string): Promise<string> => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const tempPath = join(tmpdir(), file.name);
  writeFileSync(tempPath, buffer);

  const uploadParams = {
    Bucket: process.env.BUCKET!,
    Key: `${file.name.replace(/\s+/g, "").trim()}-${Date.now()}-${randomUUID()}${key ? key : ""}`,
    Body: createReadStream(tempPath),
    ContentType: file.type,
  };

  const result = await s3.upload(uploadParams).promise();
  return result.Key;
};

export const getObjectURL = async (key: string): Promise<string> => {
  const command = new GetObjectCommand({
    Bucket: process.env.BUCKET!,
    Key: key,
  });

  return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export const deleteFile = async (key: string): Promise<boolean> => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.BUCKET!,
    Key: key,
  });

  await s3Client.send(command);
  return true;
};
