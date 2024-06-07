import { Configuration, PopupRequest } from "@azure/msal-browser";

const CLIENT_ID = process.env.AUTH_CLIENT_ID || "";
const TENANT_ID = process.env.AUTH_TENANT_ID || "";
const APP_NAME = "aqajobs";
export const API_SCOPE = "api://" + CLIENT_ID + "/" + APP_NAME;

export const msalConfig: Configuration = {
  auth: {
    clientId: CLIENT_ID,
    authority: "https://login.microsoftonline.com/" + TENANT_ID,
    redirectUri: "/",
    postLogoutRedirectUri: "/",
    // scope: API_SCOPE,
    // domain: "YourDomain",
  },
  cache: {
    // Optional
    cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

// export const loginRequest: PopupRequest = {
//   scopes: ["email", "profile", "User.Read"],
// };

export const loginRequest = {
  scopes: [API_SCOPE],
};

export const userDataLoginRequest = {
  scopes: ["user.read"],
};

export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
