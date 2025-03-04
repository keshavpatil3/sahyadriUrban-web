import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { SigninComponent } from './views/sessions/signin/signin.component';
import { UserRoleGuard } from './shared/guards/user-role.guard';

export const routes: Routes = [

  {
    path: '',
    component: SigninComponent
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: () => import('./views/sessions/sessions.module').then(m => m.SessionsModule),
        data: { title: 'Session' }
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule) },
      // {
      //   path: 'dashboard', loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
      //   data: { expectedRoles: ['Dashboard'], title: 'Dashboard', breadcrumb: 'Dashboard' }
      // }
      { path: 'address', loadChildren: () => import('./views/address/address.module').then(m => m.AddressModule) },
    ]
  },

 

 
























  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }