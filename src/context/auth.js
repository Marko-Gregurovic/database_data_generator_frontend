import { createContext, useContext, useReducer, useEffect } from 'react';
import Reducer from '../helpers/Reducer'

export const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const initialValues = {
  isError: false,
  isLoggedIn: false,
  token: null
}

const AuthContextProvider = ({children}) => {
  const [auth, dispatch] = useReducer(Reducer, {initialValues}, () => {
    const data = localStorage.tokens;
    return data ? JSON.parse(data) : initialValues;
  });
  
  useEffect(() => {
    localStorage.tokens = JSON.stringify(auth)
  }, [auth]);

  return (
    <AuthContext.Provider value={{auth, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
}
 
export default AuthContextProvider;