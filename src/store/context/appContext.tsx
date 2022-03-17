// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbqQXNFOxYkUXatTIqsClyvCCz_xRNWIY",
  authDomain: "sign-in-project-02.firebaseapp.com",
  databaseURL: "https://sign-in-project-02-default-rtdb.firebaseio.com",
  projectId: "sign-in-project-02",
  storageBucket: "sign-in-project-02.appspot.com",
  messagingSenderId: "64575035267",
  appId: "1:64575035267:web:b523af983993f4f20c88b6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext({
  activeUser: null,
  setActiveUser: null,
  users: null,
  setUsers: null,
  isLoading: false,
  setIsLoading: null,
  isInitialLoading: true,
});

export const AppWrapper: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [activeUser, setActiveUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [users, setUsers] = useState([]);

  /**
   * checking if user in logged in
   */
  useEffect(() => {
    const id = +localStorage.getItem("userId");

    setIsInitialLoading(true);
    const fetchData = async () => {
      const res = await fetch(
        "https://sign-in-project-02-default-rtdb.firebaseio.com/users.json"
      );
      const data = await res.json();

      setUsers(data ? data : []);
      setIsInitialLoading(false);

      if (!id) return;
      const currentUser = data
        .filter((user: { id: number }) => user && user.id === id)
        .pop();
      setActiveUser(currentUser);
    };
    fetchData();
  }, []);

  return (
    <AppContext.Provider
      value={{
        activeUser,
        setActiveUser,
        users,
        setUsers,
        isLoading,
        setIsLoading,
        isInitialLoading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
