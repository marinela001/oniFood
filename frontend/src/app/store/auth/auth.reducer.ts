import { createReducer, on } from "@ngrx/store";
import { User } from "src/app/shared/models/User";
import { loginStart, loginSuccess } from "./auth.actions";

export interface State {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export const userReducer = createReducer(
  // Supply the initial state
  initialState,
  // Add the new todo to the todos array

  // Trigger loading the todos
  on(loginStart, (state) => ({ ...state, status: 'loading' })),
  // Handle successfully loaded todos
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user: user,
    error: null,
    status: 'success',
  })),
);



