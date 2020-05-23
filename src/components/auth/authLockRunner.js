import Auth0Lock from 'auth0-lock';

const dev = {
  clientId: 'MmJZfdzGTOpVxH2L61xJtEwNtSPhqWyU',
  domain: 'dev-ehbb2jf8.auth0.com',
  audience: 'https://diplom-auth-api/',
};

const authLockRunner = ({ meRefetch, authCallback }) => {
  const lock = new Auth0Lock(dev.clientId, dev.domain, {
    closable: true,
    auth: {
      audience: dev.audience,
      responseType: 'token id_token',
      autoclose: true,
      redirect: false,
      autoParseHash: true,
    },
    theme: {
      logo: '',
      primaryColor: '#0B032D',
    },
    languageDictionary: {
      title: 'Log In to GraphQq',
    },
  });

  lock.on('authorization_error', (res) => {
    console.error('Auth Result', res);
  });
  lock.on('authenticated', (res) => {
    localStorage.setItem('access_token', res.accessToken);
    if (meRefetch) meRefetch().then(() => authCallback && authCallback());
  });

  return lock;
};

export default authLockRunner;
