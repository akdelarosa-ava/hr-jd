import { PublicClientApplication } from "@azure/msal-browser";
import { API_SCOPE } from "./auth-config";

export async function getCurrentToken(
  msalInstance: PublicClientApplication
): Promise<string | null> {
  const acquireAccessToken = async () => {
    const activeAccount = msalInstance.getActiveAccount();
    const accounts = msalInstance.getAllAccounts();

    if (!activeAccount && accounts.length === 0) {
      return null;
    }

    const request = {
      scopes: [API_SCOPE],
      account: activeAccount || accounts[0],
    };

    try {
      const authResult = await msalInstance.acquireTokenSilent(request);
      return authResult.accessToken;
    } catch (error) {
      try {
        const authResult = await msalInstance.acquireTokenPopup(request);
        return authResult.accessToken;
      } catch (error) {
        console.error("Error acquiring token:", error);
        return null;
      }
    }
  };

  var token = null;

  if (typeof window !== "undefined") {
    token = await acquireAccessToken();
  }

  return token;
}
