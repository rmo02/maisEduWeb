import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
