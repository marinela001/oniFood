import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { State } from "./auth.reducer";



const getUserState =createFeatureSelector<State>('auth');
export const getUser = createSelector(getUserState,(state)=>{

  return state.user;
})

export const isAuthenticated = createSelector(getUserState,(state)=>{

  return state.isAuthenticated;
})

