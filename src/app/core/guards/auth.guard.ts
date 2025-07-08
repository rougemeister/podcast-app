import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { selectIsAuthenticated } from '../../store/auth/auth.selectors';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectIsAuthenticated).pipe(
    map(isAuthenticated => {
      if (isAuthenticated) {
        return true;
      }
      
      router.navigate(['/admin/login'], { queryParams: { returnUrl: state.url } });
      return false;
    })
  );
};