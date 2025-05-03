import sharp from "sharp";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import config from "../config";

const s3Client = new S3Client();

export const uploadUniversityCard = async (
  email: string,
  universityId: number,
  universityCard: File
) => {
  // standardize the image to png format
  const arrayBuffer = await universityCard.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const pngBuffer = await sharp(buffer).png().toBuffer();

  const fileKey = `university-cards/${universityId}/${email}.png`;

  const command = new PutObjectCommand({
    Bucket: config.env.s3Bucket,
    Key: fileKey,
    Body: pngBuffer,
  });

  await s3Client.send(command);
  return fileKey;
};
