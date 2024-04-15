import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useUserContext = () => useContext(AuthContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState("");
  const [emailUser, setEmailUser] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = (name, data, email) => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));

    const hasUser = storedUsers?.find((user) => user.email === email);

    if (hasUser) {
      return "Já existe uma conta com este e-mail";
    }

    const newUser = {name, data, email};
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
  };

  const findUserByEmail = () => {
    const userToken = localStorage.getItem("user_token");

    if (userToken) {
      const storedUsers = JSON.parse(localStorage.getItem("users_bd"));
      const usersl = JSON.parse(localStorage.getItem("users"));
      const hasUser = storedUsers?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      const user = usersl?.find(
        (user) => user.email === JSON.parse(userToken).email
      );

      return user;
    }
  };

  return (
    <AuthContext.Provider value={{ users, addUser, findUserByEmail, name, setName, data, setData, email, setEmail, emailUser, setEmailUser }}>
      {children}
    </AuthContext.Provider>
  );
};
