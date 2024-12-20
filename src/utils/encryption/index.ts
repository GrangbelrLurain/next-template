import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY || 'your-secret-key';

// 객체나 문자열을 암호화
export const encrypt = (data: string | object, key: string): string => {
  // 객체인 경우 JSON 문자열로 변환
  const dataString = typeof data === 'object' ? JSON.stringify(data) : String(data);
  return CryptoJS.AES.encrypt(dataString, SECRET_KEY + key).toString();
};

// 암호화된 데이터를 복호화
export const decrypt = (encryptedData: string, key: string): string | object | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY + key);
    const decryptedString = bytes.toString(CryptoJS.enc.Utf8);

    // JSON 객체로 파싱 시도
    try {
      return JSON.parse(decryptedString);
    } catch {
      // 파싱 실패시 문자열 그대로 반환
      return decryptedString;
    }
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
};
