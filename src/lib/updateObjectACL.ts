import { PutObjectAclCommand } from "@aws-sdk/client-s3";
import { Bucket, getS3Client } from "./utils";
// @TODO remove?
export const putObjectACL = (
  Key: string,
  ACL: "public-read" | "private" = "private"
) => {
  const input = {
    AccessControlPolicy: {},
    Bucket,
    Key,
    ACL,
  };
  const command = new PutObjectAclCommand(input);
  return getS3Client().send(command);
};
