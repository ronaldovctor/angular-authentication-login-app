import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/main/people'
  },
  {
    path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule), canActivate: [ AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
