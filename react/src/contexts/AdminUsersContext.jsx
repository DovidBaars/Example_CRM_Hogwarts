import React, { createContext, useState } from "react";

export const AdminUsersContext = createContext();

const AdminUsersContextProvider = (props) => {
  const [currentAdminUser, setCurrentAdminUser] = useState(null);
  const [currentStudentAccount, setCurrentStudentAccount] = useState(null);
  const [adminDataStore, setAdminDataStore] = useState(null);
  const [studentDataStore, setStudentDataStore] = useState(null);
  const [optionsList, setOptionsList] = useState(null);
  const [starCurrentValues, setStarCurrentValues] = useState([]);
  const [starDesiredValues, setStarDesiredValues] = useState([]);

  return (
    <AdminUsersContext.Provider
      value={{
        currentAdminUser,
        setCurrentAdminUser,
        logoutCurrentAdminUser: () => setCurrentAdminUser(null),
        adminDataStore,
        setAdminDataStore,
        currentStudentAccount,
        setCurrentStudentAccount,
        logoutCurrentStudentAccount: () => setCurrentStudentAccount(null),
        studentDataStore,
        setStudentDataStore,
        optionsList,
        setOptionsList,
        starCurrentValues,
        setStarCurrentValues,
        starDesiredValues,
        setStarDesiredValues,
      }}
    >
      {props.children}
    </AdminUsersContext.Provider>
  );
};

export default AdminUsersContextProvider;
