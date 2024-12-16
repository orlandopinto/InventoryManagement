import { AES, enc } from 'crypto-js';
import { secretKey } from './Constants.d';

var key = enc.Hex.parse(secretKey);
var iv = enc.Hex.parse(secretKey);

export const encrypt = (value: string) => {
    var ciphertext = AES.encrypt(value, key, { iv: iv }).toString();
    return ciphertext;
}

export const decrypt = (ciphertext: string) => {
    var decryptStr = AES.decrypt(ciphertext, key, { iv: iv }).toString(enc.Utf8);
    return decryptStr;
}