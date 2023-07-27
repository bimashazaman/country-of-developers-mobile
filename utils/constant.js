// export const BASE_URL = 'http://10.0.2.2:8001/api';
// export const WEB_URL = 'http://10.0.2.2:8001';
// export const CHAT_API = 'http://10.0.2.2:8001/chatify/api';

// production
export const BASE_URL = 'https://pokersocial.net/api';
export const WEB_URL = 'https://pokersocial.net';
export const CHAT_API = 'https://pokersocial.net/chatify/api';

//pusher
export const CLUSTER_NAME = 'ap2';
export const APP_KEY = 'f1328666ef8e92a9d2bf';
export const VERSION = '7.2';

export const WEB_SOCKET_URL = `wss://ws-${CLUSTER_NAME}.pusher.com/app/${APP_KEY}?protocol=7&client=js&version=${VERSION}&flash=false`;
