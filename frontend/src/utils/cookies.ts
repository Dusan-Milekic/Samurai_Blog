import { useCookies } from 'react-cookie';
import { type IAccount } from '../redux/api/accountSlice';

export const useAuthCookies = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['userSession']);

  const setUserSession = (user: IAccount, days: number = 7) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    
    setCookie('userSession', user, {
      path: '/',
      expires,
      sameSite: 'strict',
      secure: window.location.protocol === 'https:'
    });
  };

  const getUserSession = (): IAccount | null => {
    return cookies.userSession || null;
  };

  const clearUserSession = () => {
    removeCookie('userSession', { path: '/' });
  };

  return {
    setUserSession,
    getUserSession,
    clearUserSession,
    hasSession: !!cookies.userSession
  };
};