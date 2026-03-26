import {
  randomBytes,
  createDecipheriv,
  createCipheriv,
} from "crypto";

function getKey(): Buffer {
  const key = Buffer.from(process.env.ENCRYPTION_KEY_BASE64 || "", "base64");
  if (key.length !== 32) {
    throw new Error(
      "ENCRYPTION_KEY_BASE64 must be a base64-encoded 32-byte AES key",
    );
  }
  return key;
}

export function enc(plain: string): string {
  const key = getKey();
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", key, iv);
  const ct = Buffer.concat([c.update(plain, "utf8"), c.final()]);
  const tag = c.getAuthTag();
  return Buffer.concat([iv, tag, ct]).toString("base64");
}

export function dec(b64: string): string {
  const key = getKey();
  const buf = Buffer.from(b64, "base64");
  const iv = buf.subarray(0, 12);
  const tag = buf.subarray(12, 28);
  const data = buf.subarray(28);
  const d = createDecipheriv("aes-256-gcm", key, iv);
  d.setAuthTag(tag);
  const pt = Buffer.concat([d.update(data), d.final()]);
  return pt.toString("utf8");
}
