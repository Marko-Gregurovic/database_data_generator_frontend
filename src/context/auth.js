import { createContext, useContext, useReducer, useEffect } from 'react';
import Reducer from '../helpers/Reducer'

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const initialValues = {
  isError: false,
  isLoggedIn: false,
  token: null,
  message: null,
  database: null,
  connectionId: null,
  stereotypes: null,
  databasePassword: null
}

const AuthContextProvider = ({children}) => {
  const [auth, dispatch] = useReducer(Reducer, {initialValues}, () => {
    const data = localStorage.dbGenApplication;
    return data ? JSON.parse(data) : initialValues;
  });
  
  useEffect(() => {
    localStorage.dbGenApplication = JSON.stringify(auth)
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;