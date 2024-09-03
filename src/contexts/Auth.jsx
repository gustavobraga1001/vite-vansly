import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const storedUsers = JSON.parse(localStorage.getItem("users_bd"));
      const hasUser = storedUsers?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = storedUsers?.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.email === email && hasUser.senha === password) {
        const token = Math.random().toString(36).substring(2);
        localStorage.setItem("user_token", JSON.stringify({ email, token }));
        setUser(hasUser);
        return;
      } else {
        return "E-mail ou senha incorretos";
      }
    } else {
      return "Usuário não cadastrado";
    }
  };

  const signup = (newUser) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = storedUsers?.find((user) => user.email === newUser.email);

    if (hasUser) {
      return "Já existe uma conta com este e-mail";
    }

    const usersNewBd = [...(storedUsers || []), newUser];
    localStorage.setItem("users_bd", JSON.stringify(usersNewBd));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
