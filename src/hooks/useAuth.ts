/** to-do: 사용자 인증 기능 추가 */
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// export function useAuth() {
//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     const result = await signInWithPopup(auth, provider);

//     // 사용할 수 있는 여러 고유 값들
//     const possibleKeys = {
//       uid: result.user.uid, // 가장 안정적인 고유 ID
//       providerId: result.user.providerId, // 인증 제공자 ID (google.com)
//       accessToken: result.user.refreshToken, // 액세스 토큰 (주기적으로 변경됨)
//       creationTime: result.user.metadata.creationTime, // 계정 생성 시간
//     };

//     // 여러 값을 조합해서 더 강력한 키 생성 가능
//     const encryptionKey = `${result.user.uid}_${result.user.metadata.creationTime}`;

//     return {
//       userId: result.user.uid,
//       encryptionKey,
//     };
//   };

//   return { signInWithGoogle };
// }
