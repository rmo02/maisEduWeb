import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";
import socketServices from "./util/socketServices";

export function App() {


  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
