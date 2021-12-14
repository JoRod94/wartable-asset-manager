// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { newS3Client, uploadAsset } from "../../api/s3";
import { Asset } from "../../types";

type Data =
  | Asset
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = newS3Client();

  const { file, name } = req.body;

  const asset = await uploadAsset(client, file, name);

  if (asset) {
    res.status(200).json(asset);
  } else {
    res.status(500).json({ error: `Error uploading ${name}` });
  }
}
