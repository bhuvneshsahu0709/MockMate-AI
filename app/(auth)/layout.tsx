import { ReactNode } from "react";
import AuthRedirectGuard from "./AuthRedirectGuard";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="auth-layout">
      <AuthRedirectGuard>{children}</AuthRedirectGuard>
    </div>
  );
};

export default AuthLayout;
