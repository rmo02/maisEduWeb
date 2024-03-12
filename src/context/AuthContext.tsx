import React, { createContext, useState, ReactNode } from "react";

interface User {
  id: string;
  id_senha: string;
  name: string;
}

interface AuthContextType {
  token: string | null;
  setToken: (newToken: string | null) => void;
  user: User | null;
  setUser: (newUser: User | null) => void;
}

const initialUser: User | null = {
  id: "",
  id_senha: "",
  name: ""
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  user: initialUser,
  setUser: () => {}
});

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => {
    // Recupera o token do sessionStorage ou retorna null se não estiver presente
    const storedToken = sessionStorage.getItem("token");
    return storedToken ? storedToken : null;
  });

  const [user, setUser] = useState<User | null>(() => {
    // Recupera o user do sessionStorage ou retorna null se não estiver presente
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    // Atualiza o sessionStorage com o novo valor do token
    if (newToken) {
      sessionStorage.setItem("token", newToken);
    } else {
      sessionStorage.removeItem("token");
    }
  };

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    // Atualiza o sessionStorage com o novo valor do user
    if (newUser) {
      sessionStorage.setItem("user", JSON.stringify(newUser));
    } else {
      sessionStorage.removeItem("user");
    }
  };

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken, user, setUser: updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
