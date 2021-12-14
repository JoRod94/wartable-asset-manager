import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { Asset } from "../types";
import { sizeInMB } from "../utils";

export const newS3Client = () => {
  return new S3Client({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.S3_UPLOAD_KEY!,
      secretAccessKey: process.env.S3_UPLOAD_SECRET!,
    },
  });
};

export const getAssets = async (client: S3Client): Promise<Asset[] | null> => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_UPLOAD_BUCKET,
  });

  const response = await client.send(command);

  const assets = response.Contents
    ? response.Contents.map((value, _index, _array) => {
        const roundedSize = sizeInMB(value.Size);
        const name = value.Key ? value.Key.split(".")[0] : "not_found";
        return {
          name,
          size: roundedSize,
          uri: `https://${process.env.S3_UPLOAD_BUCKET}.s3.eu-west-2.amazonaws.com/${name}.stl`,
        } as Asset;
      })
    : null;
  return assets;
};
