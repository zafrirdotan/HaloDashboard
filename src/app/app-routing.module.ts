import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailsComponent } from './users/user-details/user-details.component';

const routes: Routes = [
  { path: 'user-details/:id', component: UserDetailsComponent },
  { path: '**', redirectTo: '/user-details/null', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
