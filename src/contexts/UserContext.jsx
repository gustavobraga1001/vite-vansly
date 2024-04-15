import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useUserContext = () => useContext(AuthContext);

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  const addUser = (email, name, birthdate) => {
    const newUser = { email, name, birthdate };
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
    <AuthContext.Provider value={{ users, addUser, findUserByEmail }}>
      {children}
    </AuthContext.Provider>
  );
};
