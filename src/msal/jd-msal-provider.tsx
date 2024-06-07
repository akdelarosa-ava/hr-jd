"use client";
import { ReactNode, useEffect } from "react";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { initializeMsal, msalInstance } from "./msal";
import UnauthorizedMessage from "@/components/unauthorized-message";

type Props = {
  children: ReactNode;
};
const JDMsalProvider = ({ children }: Props) => {
  useEffect(() => {
    initializeMsal();
  }, []);

  return (
    <MsalProvider instance={msalInstance}>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <UnauthorizedMessage />
      </UnauthenticatedTemplate>
    </MsalProvider>
  );
};

export default JDMsalProvider;
