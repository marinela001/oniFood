import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom, exhaustMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserService } from 'src/app/services/user.service';
import { loginStart, loginSuccess } from './auth.actions';
import { User } from 'src/app/shared/models/User';
import { Router } from '@angular/router';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.userService.login(action.user).pipe(
          map((data) => {
            const user = this.userService.formatUser(data);
            return loginSuccess({ user, redirect: true });
          }),
        );
      })
    );
  });


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess]),
        tap((action) => {
          if (action.redirect) {
            this.router.navigate(['/']);
          }
        })
      );
    },
    { dispatch: false }
  );


}
