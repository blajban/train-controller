const NODE_ENV = process.env.NODE_ENV;

export const API_URL = NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL_PROD 
  : process.env.REACT_APP_API_URL_DEV;

export const API_KEY = NODE_ENV === 'test' 
  ? 'testkey' 
  : process.env.REACT_APP_API_KEY;
