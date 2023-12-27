import type { NextApiRequest, NextApiResponse } from 'next'
import encrypt from '../../utils/encrypt';
import decrypt from '../../utils/decrypt';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    if (req.method !== "POST") {
      throw new Error(`${req.method} is an invalid request method.`)
    }
    const { password } = req.body

    const encrypted = encrypt(password)

    const serverPrivateKeyHex = process.env.ECC_PRIVATE_KEY || '';
    const decrypted = decrypt(encrypted.encryptedPassword, encrypted.iv, encrypted.clientKey, serverPrivateKeyHex)

    console.log(`Original: ${password}`);
    console.log(`Encrypted: ${encrypted.encryptedPassword}`);
    console.log(`Decrypted: ${decrypted}`);

    res.status(200).json({ message: "Success" })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}

