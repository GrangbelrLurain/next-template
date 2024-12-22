import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

/** to-do: 사용자 인증 기능 추가 */
const GOOGLE_AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI;

const getSignInParams = (state: string) => {
  if (!CLIENT_ID) throw new Error('Google Client ID가 설정되지 않았습니다.');
  if (!REDIRECT_URI) throw new Error('Redirect URI가 설정되지 않았습니다.');
  return {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ].join(' '),
    prompt: 'consent',
    state,
  };
};

const cookieToken = {
  getGoogle: () => Cookies.get('google_access_token'),
  setGoogle: (accessToken: string) => Cookies.set('google_access_token', accessToken),
  removeGoogle: () => Cookies.remove('google_access_token'),
};

export function useAuth() {
  const router = useRouter();

  const signInWithGoogle = () => {
    const state = crypto.randomUUID();
    sessionStorage.setItem('oauth_state', state);

    const params = getSignInParams(state);

    const authUrl = `${GOOGLE_AUTH_ENDPOINT}?${new URLSearchParams(params)}`;
    router.push(authUrl);
  };

  const signOutWithGoogle = () => {
    cookieToken.removeGoogle();
    if (router.pathname !== '/') {
      router.push('/');
    } else {
      router.reload();
    }
  };

  const handleAuthCallback = () => {
    const params = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = params.get('access_token');
    const state = params.get('state');

    if (!accessToken || !state) return null;
    if (state !== sessionStorage.getItem('oauth_state')) return null;

    cookieToken.setGoogle(accessToken);
    return accessToken;
  };

  const getUserInfo = async () => {
    try {
      const accessToken = cookieToken.getGoogle();
      if (!accessToken) return null;
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.json();
      return {
        userId: data.sub, // 고유 ID
        email: data.email, // 이메일
        name: data.name, // 이름
        profileImage: data.picture, // 프로필 이미지
      };
    } catch (error) {
      console.error('사용자 정보 가져오기 실패:', error);
      return null;
    }
  };
  return { signInWithGoogle, handleAuthCallback, getUserInfo, signOutWithGoogle };
}
