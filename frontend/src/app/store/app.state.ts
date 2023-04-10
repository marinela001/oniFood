
import * as auth from './auth/auth.reducer';

export interface AppState {
  authState: auth.State;
}
