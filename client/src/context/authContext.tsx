import { createContext } from "react";

export interface IUser {
  name: string;
  email: string;
  isAuth: boolean;
}
const defaultValue: {
  user: IUser | null;
  login: (dataInfo: IUser) => void;
  logout: () => void;
} = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(defaultValue);
