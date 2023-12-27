import { ec as EC } from 'elliptic';
import { createDecipheriv, Decipher } from 'crypto';

const decrypt = (
  encryptedData: string,
  ivHex: string,
  clientPublicKeyHex: string,
  serverPrivateKeyHex: string
): string => {
  const ec = new EC(process.env.NEXT_PUBLIC_ECC_CURVE || '');

  const clientPublicKey = ec.keyFromPublic(clientPublicKeyHex, 'hex');
  const serverPrivateKey = ec.keyFromPrivate(serverPrivateKeyHex, 'hex');

  // Derive the shared secret
  const sharedSecret = serverPrivateKey.derive(clientPublicKey.getPublic());
  const sharedSecretBytes = Buffer.from(sharedSecret.toString(16, 64), 'hex');
  const aesKeyLength = 32; // AES-256 needs 32 bytes key
  const aesKey = sharedSecretBytes.subarray(0, aesKeyLength);

  // Prepare the key for AES
  const iv = Buffer.from(ivHex, 'hex');

  console.log(aesKey)
  console.log(iv)

  // Decrypt the data
  const decipher: Decipher = createDecipheriv('aes-256-cbc', aesKey, iv);
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  return decrypted;
}

export default decrypt