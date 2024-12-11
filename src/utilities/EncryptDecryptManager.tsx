import { AES, enc } from 'crypto-js';
import { secretKey } from './Constants.d';

export const encrypt = (plainText: CryptoJS.lib.CipherParams | string): CryptoJS.lib.CipherParams | string => {
    const cipherText = AES.encrypt(plainText.toString(), secretKey).toString()
    return cipherText
}

export const decrypt = (cipherText: CryptoJS.lib.CipherParams | string) => {
    const bytes = AES.decrypt(cipherText, secretKey)
    const plainText = bytes.toString(enc.Utf8)
    return plainText
}

export const generateSecretKey = (): string => {
    const keyLength = 32; // 32 bytes = 256 bits (AES-256)
    const buffer = new Uint8Array(keyLength);
    crypto.getRandomValues(buffer);
    const sk = Array.from(buffer, (byte) =>
        byte.toString(16).padStart(2, '0')
    ).join('');
    console.log('secret key: ' + sk)
    return sk;
};