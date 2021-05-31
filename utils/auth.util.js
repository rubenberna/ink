const msal = require('@azure/msal-node')

const {
  CLIENT_ID,
  AUTHORITY,
  SECRET
} = process.env

const MSAL_CONFIG = {
  auth: {
    clientId: CLIENT_ID,
    authority: AUTHORITY,
    clientSecret: SECRET
  },
};

const pca = new msal.PublicClientApplication(MSAL_CONFIG);

const deviceCodeRequest = {
  deviceCodeCallback: (response) => (console.log(response.message)),
  scopes: ["user.read"],
};

export const authenticate = async () => {
  try {
    return await pca.acquireTokenByDeviceCode(deviceCodeRequest)
  } catch (e) {
    console.log(e);
  }
}