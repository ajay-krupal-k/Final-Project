import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent } from './components/authentication/authentication.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component'

const routes: Routes = [
  {
    path: 'register',
    component: AuthenticationComponent
  },
  {
    path: '404',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
