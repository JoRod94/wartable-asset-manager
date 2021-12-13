import { ListObjectsV2Command, S3Client } from "@aws-sdk/client-s3";
import { Asset } from "../types";

export const newS3Client = () => {
  return new S3Client({
    region: "eu-west-2",
    credentials: {
      accessKeyId: process.env.WARTABLE_AWS_ACCESS_KEY!,
      secretAccessKey: process.env.WARTABLE_AWS_SECRET_ACCESS_KEY!,
    },
  });
};

export const getAssets = async (client: S3Client): Promise<Asset[] | null> => {
  const command = new ListObjectsV2Command({
    Bucket: process.env.WARTABLE_S3_BUCKET_NAME,
  });

  const response = await client.send(command);

  const assets = response.Contents
    ? response.Contents.map((value, _index, _array) => {
        const size = value.Size ? value.Size / 1000000 : 0;
        const roundedSize = Math.round(size * 100) / 100;
        const name = value.Key ? value.Key.split(".")[0] : "not_found";
        return {
          name,
          size: roundedSize,
          uri: `https://${process.env.WARTABLE_S3_BUCKET_NAME}.s3.eu-west-2.amazonaws.com/${name}.stl`,
        } as Asset;
      })
    : null;
  return assets;
};
