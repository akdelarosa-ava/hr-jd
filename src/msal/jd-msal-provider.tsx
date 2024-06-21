"use client";
import { ReactNode, useEffect } from "react";
import {
  MsalAuthenticationTemplate,
  MsalProvider,
} from "@azure/msal-react";
import { initializeMsal, msalInstance } from "./msal";
import { InteractionType } from "@azure/msal-browser";
import { userDataLoginRequest } from "./auth-config";

type Props = {
  children: ReactNode;
};
const JDMsalProvider = ({ children }: Props) => {
  useEffect(() => {
    initializeMsal();
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <MsalAuthenticationTemplate 
        interactionType={InteractionType.Redirect}
        authenticationRequest={{ ...userDataLoginRequest }}
      >
        {children}
      </MsalAuthenticationTemplate>
    </MsalProvider>
  );
};

export default JDMsalProvider;
