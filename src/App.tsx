import { useEffect } from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";
import socketServices from "./util/socketServices";

export function App() {

  useEffect(() => {
    // Inicialize o serviço de socket
    socketServices.initializeSocket();
  }, []);


  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
