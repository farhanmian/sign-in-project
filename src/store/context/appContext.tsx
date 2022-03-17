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
import { UserType } from "../types/types";

interface AppContextInterface {
  activeUser: UserType | null;
  setActiveUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  users: UserType[];
  setUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isInitialLoading: boolean;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const AppWrapper: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const [activeUser, setActiveUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [users, setUsers] = useState<UserType[]>([]);

  /**
   * checking if user in logged in
   */
  useEffect(() => {
    const storeUserId = localStorage.getItem("userId");
    const id = storeUserId ? +storeUserId : null;

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
        isLoading,
        setIsLoading,
        isInitialLoading,
        users,
        setUsers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
