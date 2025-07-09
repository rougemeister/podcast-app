import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        canActivate: [authGuard],
        children:[
            {
                path: '',
                loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent)
            },
            {
                path: 'confessions',
                loadComponent: () => import('./components/confessions/confessions.component').then(m => m.ConfessionsComponent)
            },
            {
                path: 'playlists',
                loadComponent: () => import('./components/playlists/playlists.component').then(m => m.PlaylistsComponent)
            },
            {
                path: 'episodes',
                loadComponent: () => import('./components/episodes/episodes.component').then(m => m.EpisodesComponent)
            },
            {
                path: 'teams',
                loadComponent: () => import('./components/teams/teams.component').then(m => m.TeamsComponent)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('../app/authentication/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('../app/authentication/register/register.component').then(m => m.RegisterComponent)
    }
];
