const config = {
  env: {
    awsRegion: process.env.AWS_REGION!,
    s3Bucket: process.env.AWS_S3_BUCKET!,
    imageSizeLimit: Number(process.env.NEXT_PUBLIC_IMAGE_SIZE_LIMIT!),
    minTimeToRefreshSession: Number(
      process.env.NEXT_PUBLIC_SESSION_MIN_MS_TO_REFRESH!
    ),
    sessionMaxAge: Number(process.env.NEXT_PUBLIC_SESSION_MAX_AGE!),
  },
};

export default config;
