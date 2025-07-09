import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfessionsService, Confession } from './core/services/confessions.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsAuthenticated, selectAuthLoading } from './store/auth/auth.selectors';
import * as AuthActions from './store/auth/auth.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'podcast-app';
  confessions: Confession[] = [];

  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(AuthActions.checkAuthStatus());
    this.store.select(selectAuthLoading).subscribe(loading => {
      if (!loading) {
        this.store.select(selectIsAuthenticated).pipe(take(1)).subscribe(isAuthenticated => {
          if (isAuthenticated) {
            if (this.router.url !== '/') {
              this.router.navigate(['/']);
            }
          } else {
            if (this.router.url !== '/login') {
              this.router.navigate(['/login']);
            }
          }
        });
      }
    });
  }
}
