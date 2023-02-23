import { destroyCookie, parseCookies, setCookie } from 'nookies';
import CryptoJS from 'crypto-js';

const SessionSecret = process.env.SESSION_KEY;

const set = (session) => {
  if (!session) {
    throw new Error('This session data is required');
  }

  if (!SessionSecret) {
    throw new Error('This secret is required');
  }

  let sessionData = JSON.stringify(session);
  sessionData = CryptoJS.AES.encrypt(sessionData, SessionSecret);
  sessionData = sessionData.toString();

  destroyCookie(undefined, 'tapcolor_session');
  setCookie(
    undefined,
    'tapcolor_session',
    sessionData,
    {
      maxAge: 60 * 60 * 8, // 8 Horas
      priority: 'high',
    },
  );
};

const get = () => {
  const { tapcolor_session: sessionCookie } = parseCookies();

  if (!sessionCookie) {
    return {};
  }

  let bytes = CryptoJS.AES.decrypt(sessionCookie, SessionSecret);
  bytes = bytes.toString(CryptoJS.enc.Utf8);
  bytes = JSON.parse(bytes);

  return bytes;
};

const remove = () => {
  destroyCookie(undefined, 'tapcolor_session');
};

const decryptSession = (context) => {
  const { tapcolor_session: sessionCookie } = parseCookies(context);

  if (!sessionCookie) {
    return null;
  }

  let bytes = CryptoJS.AES.decrypt(sessionCookie, SessionSecret);
  bytes = bytes.toString(CryptoJS.enc.Utf8);
  bytes = JSON.parse(bytes);

  return bytes;
};

const getAuth = () => {
  const { tapcolor_session: sessionCookie } = parseCookies();

  return sessionCookie !== undefined;
};

const Session = {
  set,
  get,
  remove,
  decryptSession,
  getAuth,
};

export default Session;
