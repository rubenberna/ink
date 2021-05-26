const msal = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.CLIENT_ID,
    authority: process.env.AUTHORITY,
    clientSecret: process.env.SECRET
  },
};

const pca = new msal.PublicClientApplication(msalConfig);

const deviceCodeRequest = {
  deviceCodeCallback: (response) => (console.log(response.message)),
  scopes: ["user.read"],
}

async function login(){
  try {
    return await pca.acquireTokenByDeviceCode(deviceCodeRequest)
  } catch (error) {
    console.log(error)
  }
}

export {
  login
}