import { ec as EC } from 'elliptic';
import { randomBytes, createCipheriv } from 'crypto';

// Encrypt the password
const encrypt = (password: string) => {
  // Initialize elliptic curve
  const ec = new EC(process.env.NEXT_PUBLIC_ECC_CURVE || '');

  // Server's public key from .env
  const serverPublicKeyHex = process.env.NEXT_PUBLIC_ECC_PUBLIC_KEY;

  const serverPublicKey = ec.keyFromPublic(serverPublicKeyHex || '', 'hex');

  // Generate client key pair (or load from a secure storage if persistent key is needed)
  const clientKey = ec.genKeyPair();

  // Derive shared secret using server's public key
  const sharedSecret = clientKey.derive(serverPublicKey.getPublic());

  // Use the shared secret to generate an AES key
  // Instead of slice, using Buffer.from for the shared secret and then using subarray
  const sharedSecretBytes = Buffer.from(sharedSecret.toString(16, 64), 'hex');
  const aesKeyLength = 32; // AES-256 needs 32 bytes key
  const aesKey = sharedSecretBytes.subarray(0, aesKeyLength);

  const iv = randomBytes(16); // Initialization vector for AES
  const cipher = createCipheriv('aes-256-cbc', aesKey, iv);
  let encryptedPassword = cipher.update(password, 'utf8', 'hex');
  encryptedPassword += cipher.final('hex');

  // Prepare data for sending to server
  const data = {
    clientKey: clientKey.getPublic('hex'),
    iv: iv.toString('hex'),
    encryptedPassword: encryptedPassword
  };

  return data
}

export default encrypt