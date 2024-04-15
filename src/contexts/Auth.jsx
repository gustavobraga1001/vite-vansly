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

      console.log(hasUser);

      if (hasUser) setUser(hasUser);
    }
  }, []);

  const signin = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = storedUsers?.find((user) => user.email === email);

    if (hasUser) {
      if (hasUser.email === email && hasUser.password === password) {
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

  const signup = (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = storedUsers?.find((user) => user.email === email);

    if (hasUser) {
      return "Já existe uma conta com este e-mail";
    }

    const newUser = [...(storedUsers || []), { email, password }];
    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user_token");
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
