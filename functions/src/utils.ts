import crypto from "crypto";

export const hashingFunc = (str: string) =>
  crypto.createHash("sha256").update(str, "utf8").digest("hex");
