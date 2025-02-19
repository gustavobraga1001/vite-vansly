import { createContext, useEffect, useState } from "react";
import { getUserLocalStorage, LoginRequest, RegisterRequest } from "./util";
import Api from "./services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function getUser() {
    try {
      const response = await Api.get("me");

      return response.data;
    } catch (error) {
      // console.log(error.response.status);
    }
  }

  async function getUsers() {
    try {
      const response = await Api.get("workers");

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async function authenticate(email, password) {
    const response = await LoginRequest(email, password);

    if (response != null) {
      localStorage.setItem("accessToken", response.token);
    } else {
      throw new Error("E-mail ou senha inválidas");
    }
  }

  async function register(name, email, password) {
    const response = await RegisterRequest(name, email, password);

    if (response.status !== 201) {
      // Aqui você lança o erro para cair no catch
      throw new Error(response.response.data.message);
    }
  
    // Se deu tudo certo, retorna a resposta
    return response.data;
  }
  

  const logout = async () => {
    // Limpa o localStorage
    localStorage.clear();
  
    // Expira todos os cookies
    try {
      const request = await Api.post("/logout");
      window.location.href = "/login";
      return request.data;
    } catch (error) {
      return null;
    }

  };
  
  return (
    <AuthContext.Provider
      value={{ ...user, authenticate, logout, getUser, getUsers, register, }}
    >
      {children}
    </AuthContext.Provider>
  );
};